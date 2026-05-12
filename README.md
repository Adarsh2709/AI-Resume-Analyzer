# AI Resume Analyzer

An AI-powered Resume Analysis System that parses resume PDFs, extracts skills, compares resumes with job descriptions, and generates intelligent job recommendations using NLP and Machine Learning techniques.

---

# Features

- Resume PDF Parsing
- Skill Extraction
- TF-IDF Based Resume Matching
- Cosine Similarity Scoring
- Missing Skills Detection
- Job Recommendations
- Modular Backend Architecture
- Lightweight & Deployable
- No Database Required

---

# Tech Stack

## Backend
- FastAPI
- Python
- pdfplumber
- scikit-learn
- spaCy

## NLP & Machine Learning
- TF-IDF Vectorization
- Cosine Similarity
- Rule-Based Skill Extraction

## Deployment
- Frontend → Vercel
- Backend → Render

---

# Project Workflow

```text
Resume PDF Upload
        ↓
Text Extraction
        ↓
Text Cleaning
        ↓
Skill Extraction
        ↓
Resume-Job Matching
        ↓
Similarity Score Generation
        ↓
Missing Skills Detection
        ↓
Job Recommendations
        ↓
JSON Response
```

---

# Project Structure

```bash
AI-Resume-Analyzer/
│
├── frontend/
│
├── backend/
│   │
│   ├── app.py
│   ├── requirements.txt
│   ├── render.yaml
│   │
│   ├── services/
│   │   ├── parser.py
│   │   ├── skill_extractor.py
│   │   ├── matcher.py
│   │   ├── recommender.py
│   │   └── suggestions.py
│   │
│   ├── utils/
│   │   └── cleaner.py
│   │
│   ├── data/
│   │   ├── skills.json
│   │   └── job_descriptions/
│   │
│   └── uploads/
│
├── README.md
└── .gitignore
```

---

# API Endpoint

## Analyze Resume

```http
POST /analyze
```

## Request

Upload PDF using `multipart/form-data`

## Response

```json
{
  "skills": ["python", "react", "sql"],
  "best_match": "Backend Developer",
  "match_score": 84,
  "missing_skills": ["docker", "aws"],
  "recommendations": [
    "ML Engineer",
    "Data Analyst"
  ]
}
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd AI-Resume-Analyzer/backend
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

---

## Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Run Backend

```bash
uvicorn app:app --reload
```

Server runs on:

```text
http://127.0.0.1:8000
```

---

# Deployment

## Frontend

Deploy on:
- Vercel

## Backend

Deploy on:
- Render

### Render Start Command

```bash
uvicorn app:app --host 0.0.0.0 --port 10000
```
