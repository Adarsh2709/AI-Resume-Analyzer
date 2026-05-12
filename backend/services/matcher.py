import os
from typing import Dict, List, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from backend.utils.cleaner import clean_text

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JOB_DESCRIPTIONS_DIR = os.path.join(BASE_DIR, "data", "job_descriptions")

def load_job_descriptions() -> Dict[str, str]:
    jobs = {}
    if not os.path.exists(JOB_DESCRIPTIONS_DIR):
        return jobs
    for filename in os.listdir(JOB_DESCRIPTIONS_DIR):
        if filename.endswith(".txt"):
            role_name = filename.replace(".txt", "").replace("_", " ").title()
            with open(os.path.join(JOB_DESCRIPTIONS_DIR, filename), "r", encoding="utf-8") as f:
                jobs[role_name] = clean_text(f.read())
    return jobs

JOB_DESCRIPTIONS = load_job_descriptions()

def get_similarity_scores(resume_text: str) -> List[Tuple[str, float]]:
    """
    Compares resume text with all job descriptions using TF-IDF and Cosine Similarity.
    Returns a sorted list of tuples: (Job Role, Score Percentage)
    """
    if not JOB_DESCRIPTIONS:
        return []
        
    roles = list(JOB_DESCRIPTIONS.keys())
    job_texts = list(JOB_DESCRIPTIONS.values())
    
    cleaned_resume = clean_text(resume_text)
    documents = [cleaned_resume] + job_texts
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)
    
    # Calculate similarity between resume (index 0) and all job descriptions (index 1 to N)
    cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    
    role_scores = []
    for role, score in zip(roles, cosine_similarities):
        # Convert to percentage
        role_scores.append((role, round(score * 100, 2)))
        
    # Sort by score descending
    role_scores.sort(key=lambda x: x[1], reverse=True)
    return role_scores
