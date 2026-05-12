import os
import sys
import logging
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Robust imports to handle different execution contexts
try:
    from backend.services.parser import extract_text_from_pdf
    from backend.services.skill_extractor import extract_skills
    from backend.services.matcher import get_similarity_scores
    from backend.services.recommender import get_top_recommendations
    from backend.services.suggestions import get_missing_skills
except ImportError:
    try:
        from services.parser import extract_text_from_pdf
        from services.skill_extractor import extract_skills
        from services.matcher import get_similarity_scores
        from services.recommender import get_top_recommendations
        from services.suggestions import get_missing_skills
    except ImportError as e:
        logger.error(f"Failed to import services: {e}")
        raise

app = FastAPI(title="AI Resume Analyzer API")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
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
        logger.exception(f"Error analyzing resume {file.filename}")
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable if available, otherwise default to 8000
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run("backend.app:app", host="0.0.0.0", port=port, reload=True)
