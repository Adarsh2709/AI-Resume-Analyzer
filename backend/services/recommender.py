from typing import List, Tuple

def get_top_recommendations(role_scores: List[Tuple[str, float]], top_n: int = 3) -> List[str]:
    """
    Returns the top N matching job roles based on similarity scores.
    """
    # Assuming role_scores is already sorted descending
    return [role for role, score in role_scores[:top_n]]
