import re

def clean_text(text: str) -> str:
    """
    Cleans the input text by:
    - converting to lowercase
    - removing non-alphanumeric characters (excluding spaces)
    - normalizing spaces
    """
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation using regex (keep only word characters and whitespace)
    text = re.sub(r'[^\w\s]', ' ', text)
    # Replace multiple spaces with a single space and strip leading/trailing whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text
