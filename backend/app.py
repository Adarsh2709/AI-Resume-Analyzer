import os
import sys
import logging
import traceback
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use relative imports - this is the standard way for packages
try:
    from .services.parser import extract_text_from_pdf
    from .services.skill_extractor import extract_skills
    from .services.matcher import get_similarity_scores
    from .services.recommender import get_top_recommendations
    from .services.suggestions import get_missing_skills
except (ImportError, ValueError):
    # Fallback for older python or direct script execution
    try:
        from services.parser import extract_text_from_pdf
        from services.skill_extractor import extract_skills
        from services.matcher import get_similarity_scores
        from services.recommender import get_top_recommendations
        from services.suggestions import get_missing_skills
    except ImportError as e:
        logger.error(f"Failed to import services: {e}")
        extract_text_from_pdf = None
        extract_skills = None
        get_similarity_scores = None
        get_top_recommendations = None
        get_missing_skills = None

app = FastAPI(title="AI Resume Analyzer API")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler to return traceback to the frontend for debugging
@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        logger.exception("Uncaught exception occurred")
        # Return the error and traceback in the response detail
        error_msg = f"{type(exc).__name__}: {str(exc)}"
        tb = traceback.format_exc()
        return JSONResponse(
            status_code=500,
            content={
                "detail": f"Backend Error: {error_msg}\n\nTraceback:\n{tb}",
                "error_type": type(exc).__name__
            }
        )

class AnalysisResponse(BaseModel):
    skills: List[str]
    best_match: str
    match_score: float
    missing_skills: List[str]
    recommendations: List[str]

@app.get("/")
def read_root():
    return {"message": "AI Resume Analyzer Backend is running."}

@app.get("/health")
def health_check():
    """Endpoint to verify system health and module imports."""
    health = {"status": "ok", "checks": {}}
    
    # Check imports and show specific errors
    checks = {
        "parser": "backend.services.parser",
        "skill_extractor": "backend.services.skill_extractor",
        "matcher": "backend.services.matcher",
        "recommender": "backend.services.recommender",
        "suggestions": "backend.services.suggestions"
    }
    
    for name, module_path in checks.items():
        try:
            __import__(module_path)
            health["checks"][name] = "ok"
        except ImportError as e:
            health["checks"][name] = f"ImportError: {str(e)}"
            health["status"] = "error"
        except Exception as e:
            health["checks"][name] = f"Error: {str(e)}"
            health["status"] = "error"
            
    return health

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    if extract_text_from_pdf is None:
        # Generate a quick health report to include in the error
        missing_reports = []
        checks = {
            "parser (pdfplumber)": "backend.services.parser",
            "skill_extractor (spacy)": "backend.services.skill_extractor",
            "matcher (scikit-learn)": "backend.services.matcher"
        }
        for label, path in checks.items():
            try:
                __import__(path)
            except ImportError as e:
                missing_reports.append(f"- {label}: {str(e)}")
            except Exception as e:
                missing_reports.append(f"- {label}: Unexpected Error: {str(e)}")
        
        report = "\n".join(missing_reports)
        raise HTTPException(
            status_code=500, 
            detail=f"Backend services failed to initialize.\n\nFailed Imports:\n{report}\n\nFix: Run 'pip install -r backend/requirements.txt' and restart."
        )
        
    try:
        logger.info(f"Analyzing resume: {file.filename}")
        # Read file contents
        contents = await file.read()
        
        # 1. Parse PDF
        resume_text = extract_text_from_pdf(contents)
        if not resume_text.strip():
            logger.warning(f"Could not extract text from PDF: {file.filename}")
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
            
        # 2. Extract Skills
        skills = extract_skills(resume_text)
        logger.info(f"Extracted {len(skills)} skills")
        
        # 3. Match against job descriptions
        role_scores = get_similarity_scores(resume_text)
        
        if not role_scores:
            logger.error("No job descriptions available for matching.")
            raise HTTPException(status_code=500, detail="No job descriptions available for matching.")
            
        # 4. Get best match and score
        best_match, match_score = role_scores[0]
        logger.info(f"Best match: {best_match} ({match_score}%)")
        
        # 5. Get top recommendations (excluding the top 1 which is the best match)
        recommendations = get_top_recommendations(role_scores[1:], top_n=2)
        
        # 6. Find missing skills for the best match
        missing_skills = get_missing_skills(skills, best_match)
        
        return AnalysisResponse(
            skills=skills,
            best_match=best_match,
            match_score=match_score,
            missing_skills=missing_skills,
            recommendations=recommendations
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Error during analysis of {file.filename}")
        # Re-raise to let the middleware handle it with traceback
        raise

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run("backend.app:app", host="0.0.0.0", port=port, reload=True)
