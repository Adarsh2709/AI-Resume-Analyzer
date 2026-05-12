# AI Resume Analyzer

A complete backend for parsing and analyzing resume PDFs against job descriptions.

## Structure
- `frontend/`: Skeleton layout for the Next.js frontend (Not implemented).
- `backend/`: Fully functional FastAPI backend.

## Deployment

**Frontend (Vercel)**
Deploy the `frontend/` directory to Vercel.

**Backend (Render)**
The backend is configured to be deployed on Render.
It uses `render.yaml` for configuration.
Start Command: `uvicorn backend.app:app --host 0.0.0.0 --port 10000`

## Local Development

```bash
# Install dependencies
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Run server
cd ..
uvicorn backend.app:app --reload --host 0.0.0.0 --port 10000
```