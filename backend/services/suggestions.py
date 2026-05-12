from typing import List
from backend.services.matcher import JOB_DESCRIPTIONS
from backend.services.skill_extractor import extract_skills

def get_missing_skills(resume_skills: List[str], best_match_role: str) -> List[str]:
    """
    Calculates missing skills by comparing extracted resume skills with the skills 
    required for the best matching job role.
    """
    if not best_match_role or best_match_role not in JOB_DESCRIPTIONS:
        return []
        
    job_text = JOB_DESCRIPTIONS[best_match_role]
    job_skills = extract_skills(job_text)
    
    resume_skills_set = set([s.lower() for s in resume_skills])
    job_skills_set = set([s.lower() for s in job_skills])
    
    missing_skills = list(job_skills_set - resume_skills_set)
    return sorted(missing_skills)
