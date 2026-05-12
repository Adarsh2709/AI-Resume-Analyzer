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

# Add current, parent, and Vercel task directories to path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
for d in [current_dir, parent_dir, "/var/task", "/var/task/backend"]:
    if os.path.exists(d) and d not in sys.path:
        sys.path.insert(0, d)

# Ultra-robust import sequence
extract_text_from_pdf = None
extract_skills = None
get_similarity_scores = None
get_top_recommendations = None
get_missing_skills = None

try:
    # 1. Try relative import
    from .services.parser import extract_text_from_pdf
    from .services.skill_extractor import extract_skills
    from .services.matcher import get_similarity_scores
    from .services.recommender import get_top_recommendations
    from .services.suggestions import get_missing_skills
    logger.info("Successfully loaded services via relative imports")
except (ImportError, ValueError):
    try:
        # 2. Try absolute import via 'backend'
        from backend.services.parser import extract_text_from_pdf
        from backend.services.skill_extractor import extract_skills
        from backend.services.matcher import get_similarity_scores
        from backend.services.recommender import get_top_recommendations
        from backend.services.suggestions import get_missing_skills
        logger.info("Successfully loaded services via 'backend' absolute imports")
    except ImportError:
        try:
            # 3. Try local import (if running from inside backend/)
            from services.parser import extract_text_from_pdf
            from services.skill_extractor import extract_skills
            from services.matcher import get_similarity_scores
            from services.recommender import get_top_recommendations
            from services.suggestions import get_missing_skills
            logger.info("Successfully loaded services via local imports")
        except ImportError as e:
            logger.error(f"CRITICAL: Failed to load services: {e}")

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
    
    if any(s is None for s in [extract_text_from_pdf, extract_skills, get_similarity_scores]):
        missing_reports = []
        # Try to diagnose the failure using both naming conventions
        for label, module_name in [("parser", "parser"), ("skill_extractor", "skill_extractor"), ("matcher", "matcher")]:
            error_found = "Not checked"
            # Try all common paths (absolute only for __import__)
            for path in [f"backend.services.{module_name}", f"services.{module_name}"]:
                try:
                    __import__(path, fromlist=['*'])
                    error_found = None # Success
                    break
                except ImportError as e:
                    error_found = str(e)
                except Exception as e:
                    error_found = f"{type(e).__name__}: {str(e)}"
            
            if error_found:
                missing_reports.append(f"- {label}: {error_found}")
        
        # Add folder structure debugging for Vercel
        try:
            cwd = os.getcwd()
            files = os.listdir(cwd)
            structure = f"CWD: {cwd}\nFiles: {', '.join(files)}"
            if 'backend' in files and os.path.isdir('backend'):
                structure += f"\nBackend contents: {', '.join(os.listdir('backend'))}"
        except Exception as e:
            structure = f"Could not list directories: {e}"

        report = "\n".join(missing_reports) if missing_reports else "Unknown initialization failure."
        raise HTTPException(
            status_code=500, 
            detail=f"Backend services failed to initialize.\n\nFailed Imports:\n{report}\n\nSystem Info:\n{structure}\n\nFix: Ensure requirements.txt is installed."
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
