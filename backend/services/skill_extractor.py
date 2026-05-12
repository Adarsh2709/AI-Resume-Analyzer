import json
import spacy
from spacy.matcher import PhraseMatcher
from typing import List
from backend.utils.cleaner import clean_text

# Ensure the model is loaded
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def load_skills() -> List[str]:
    with open("backend/data/skills.json", "r") as f:
        skills = json.load(f)
    return [skill.lower() for skill in skills]

KNOWN_SKILLS = load_skills()
matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
patterns = [nlp.make_doc(text) for text in KNOWN_SKILLS]
matcher.add("SKILLS", patterns)

def extract_skills(text: str) -> List[str]:
    """
    Extracts known skills from the given text using spaCy PhraseMatcher.
    """
    cleaned_text = clean_text(text)
    doc = nlp(cleaned_text)
    matches = matcher(doc)
    
    extracted = set()
    for match_id, start, end in matches:
        span = doc[start:end]
        extracted.add(span.text.lower())
        
    return list(extracted)
