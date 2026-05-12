import pdfplumber
import io

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extracts all text from a given PDF byte array using pdfplumber.
    """
    text = ""
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + " "
    return text
