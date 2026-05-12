"use client";

import { useCallback, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  analyzeResumePdf,
  getAnalyzeErrorMessage,
  saveAnalyzeResultToStorage,
} from "@/lib/api";

const MAX_BYTES = 15 * 1024 * 1024;

function isPdfFile(file: File): boolean {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".pdf")) return false;
  const t = file.type.toLowerCase();
  return (
    t === "application/pdf" ||
    t === "application/x-pdf" ||
    t === "application/octet-stream" ||
    t === ""
  );
}

export function UploadBox() {
  const router = useRouter();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetInput = useCallback(() => {
    const el = inputRef.current;
    if (el) el.value = "";
  }, []);

  const applyFile = useCallback((next: File | null) => {
    setError(null);
    setFile(next);
  }, []);

  const onFileChosen = useCallback(
    (list: FileList | null) => {
      const f = list?.[0];
      if (!f) return;
      if (!isPdfFile(f)) {
        applyFile(null);
        resetInput();
        setError("Please upload a single PDF file (.pdf).");
        return;
      }
      if (f.size > MAX_BYTES) {
        applyFile(null);
        resetInput();
        setError(`PDF must be under ${Math.round(MAX_BYTES / (1024 * 1024))} MB.`);
        return;
      }
      applyFile(f);
    },
    [applyFile, resetInput],
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileChosen(e.target.files);
    },
    [onFileChosen],
  );

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!loading) setDragActive(true);
    },
    [loading],
  );

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (loading) return;
      onFileChosen(e.dataTransfer.files);
    },
    [loading, onFileChosen],
  );

  const clearFile = useCallback(() => {
    applyFile(null);
    resetInput();
  }, [applyFile, resetInput]);

  const submit = useCallback(async () => {
    if (!file || loading) return;
    setError(null);
    setLoading(true);
    try {
      const result = await analyzeResumePdf(file);
      saveAnalyzeResultToStorage(result);
      router.push("/results");
    } catch (e) {
      setError(getAnalyzeErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [file, loading, router]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_60px_-20px_rgba(34,211,238,0.22)] backdrop-blur-xl sm:p-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden
      />

      <h2
        id="upload-heading"
        className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl"
      >
        Upload your resume
      </h2>
      <p className="relative mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
        PDF only. Drag and drop onto the panel or choose a file, then run
        analysis. Results are saved locally and opened on the results page.
      </p>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          "relative mt-8 rounded-2xl transition",
          dragActive
            ? "ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-zinc-950"
            : "",
        ].join(" ")}
      >
        <label
          htmlFor={inputId}
          className={[
            "flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-12 text-center transition sm:min-h-[220px]",
            dragActive
              ? "border-cyan-400/70 bg-cyan-500/10 shadow-[0_0_48px_-12px_rgba(34,211,238,0.45)]"
              : "border-cyan-400/25 bg-zinc-950/45 hover:border-cyan-400/50 hover:bg-cyan-500/[0.06]",
            loading ? "pointer-events-none opacity-70" : "",
          ].join(" ")}
        >
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={onInputChange}
            disabled={loading}
          />

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/25 to-cyan-600/5 text-cyan-200 shadow-[0_0_28px_-6px_rgba(34,211,238,0.55)]">
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-200 sm:text-base">
              Drop your PDF here
            </p>
            <p className="text-xs text-zinc-500 sm:text-sm">
              or click this area to browse —{" "}
              <span className="text-cyan-300/90">PDF only</span>
            </p>
          </div>
        </label>
      </div>

      {file ? (
        <div className="relative mt-5 flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="min-w-0 flex-1 truncate text-sm text-zinc-300" title={file.name}>
            Selected:{" "}
            <span className="font-mono text-cyan-200">{file.name}</span>
          </p>
          <button
            type="button"
            onClick={clearFile}
            disabled={loading}
            className="shrink-0 text-xs font-semibold text-zinc-500 underline-offset-4 transition hover:text-cyan-300 hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="relative mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100 whitespace-pre-wrap"
        >
          {error}
        </div>
      ) : null}

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Choose PDF
        </button>

        <button
          type="button"
          onClick={submit}
          disabled={!file || loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_36px_-10px_rgba(34,211,238,0.75)] transition hover:shadow-[0_0_48px_-8px_rgba(34,211,238,0.9)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:w-auto sm:min-w-[200px]"
        >
          {loading ? (
            <>
              <span
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950"
                aria-hidden
              />
              <span>Analyzing…</span>
            </>
          ) : (
            "Upload & analyze"
          )}
        </button>
      </div>

      {loading ? (
        <p className="relative mt-4 text-center text-xs text-zinc-500">
          Sending multipart request to{" "}
          <span className="font-mono text-zinc-400">POST /analyze</span>…
        </p>
      ) : null}
    </div>
  );
}
