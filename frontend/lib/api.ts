import axios, { type AxiosError } from "axios";

/** localStorage key for the latest successful /analyze response */
export const ANALYZE_RESULT_STORAGE_KEY = "ai_resume_analyzer_analyze_v1";

export type AnalyzeResponse = {
  skills: string[];
  best_match: string;
  match_score: number;
  missing_skills: string[];
  recommendations: string[];
};

function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured. Set it in .env.local (e.g. http://localhost:8000).",
    );
  }
  return raw.trim().replace(/\/+$/, "");
}

const analyzeClient = axios.create({
  timeout: 120_000,
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((x) => typeof x === "string");
}

export function parseAnalyzeResponse(data: unknown): AnalyzeResponse {
  if (!isRecord(data)) {
    throw new Error("Invalid response: expected a JSON object.");
  }

  const skills = data.skills;
  const best_match = data.best_match;
  const match_scoreRaw = data.match_score;
  const missing_skills = data.missing_skills;
  const recommendations = data.recommendations;

  if (!isStringArray(skills)) {
    throw new Error("Invalid response: skills must be an array of strings.");
  }
  if (typeof best_match !== "string") {
    throw new Error("Invalid response: best_match must be a string.");
  }
  let match_score: number;
  if (typeof match_scoreRaw === "number" && !Number.isNaN(match_scoreRaw)) {
    match_score = match_scoreRaw;
  } else if (
    typeof match_scoreRaw === "string" &&
    match_scoreRaw.trim() !== "" &&
    !Number.isNaN(Number(match_scoreRaw))
  ) {
    match_score = Number(match_scoreRaw);
  } else {
    throw new Error("Invalid response: match_score must be a number.");
  }
  if (!isStringArray(missing_skills)) {
    throw new Error(
      "Invalid response: missing_skills must be an array of strings.",
    );
  }
  if (!isStringArray(recommendations)) {
    throw new Error(
      "Invalid response: recommendations must be an array of strings.",
    );
  }

  return {
    skills,
    best_match,
    match_score,
    missing_skills,
    recommendations,
  };
}

/**
 * POST multipart/form-data to `{NEXT_PUBLIC_API_URL}/analyze`.
 * The PDF is sent under the form field name `file`.
 */
export async function analyzeResumePdf(file: File): Promise<AnalyzeResponse> {
  const base = getApiBaseUrl();
  const formData = new FormData();
  formData.append("file", file, file.name);

  const { data } = await analyzeClient.post<unknown>(
    `${base}/analyze`,
    formData,
  );

  return parseAnalyzeResponse(data);
}

export function saveAnalyzeResultToStorage(result: AnalyzeResponse): void {
  try {
    localStorage.setItem(
      ANALYZE_RESULT_STORAGE_KEY,
      JSON.stringify(result),
    );
  } catch {
    throw new Error("Could not save results to storage (quota or privacy mode).");
  }
}

export function loadAnalyzeResultFromStorage(): AnalyzeResponse | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ANALYZE_RESULT_STORAGE_KEY);
    if (!raw) return null;
    return parseAnalyzeResponse(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function clearAnalyzeResultFromStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANALYZE_RESULT_STORAGE_KEY);
}

export function getAnalyzeErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<unknown>;
    const status = err.response?.status;
    const data = err.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data.trim();
    }

    if (isRecord(data)) {
      const detail = data.detail;
      if (typeof detail === "string" && detail.trim()) return detail.trim();
      if (Array.isArray(detail)) {
        const parts = detail
          .map((d) =>
            isRecord(d) && typeof d.msg === "string" ? d.msg : String(d),
          )
          .filter(Boolean);
        if (parts.length) return parts.join(" ");
      }
      const message = data.message;
      if (typeof message === "string" && message.trim()) return message.trim();
      const errorField = data.error;
      if (typeof errorField === "string" && errorField.trim()) {
        return errorField.trim();
      }
    }

    if (err.code === "ECONNABORTED") {
      return "The request timed out. Try again with a smaller PDF or check your network.";
    }
    if (err.message === "Network Error") {
      return "Network error. Check NEXT_PUBLIC_API_URL, CORS, and that the API is running.";
    }
    if (status === 413) {
      return "File too large for the server. Try a smaller PDF.";
    }
    if (status === 415 || status === 422) {
      return "The server rejected this file. Ensure it is a valid PDF.";
    }
    if (status === 401 || status === 403) {
      return "You are not authorized to analyze resumes on this API.";
    }
    if (typeof status === "number") {
      return `Request failed (${status}). ${err.message}`.trim();
    }
    return err.message || "Something went wrong while contacting the API.";
  }

  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}
