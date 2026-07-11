"use client";

import { useState } from "react";
import CSVUploader from "@/components/CSVUploader";
import CSVPreview from "@/components/CSVPreview";
import ParsedResult from "@/components/ParsedResult";
import ThemeToggle from "@/components/ThemeToggle";
import { CSVRecord } from "@/types/csv";
import { CRMRecord, ImportResponse } from "@/types/crm";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CSVRecord[]>([]);
  const [records, setRecords] = useState<CRMRecord[]>([]);
  const [skippedRecords, setSkippedRecords] = useState<Record<string, string>[]>([]);
  const [totalImported, setTotalImported] = useState(0);
  const [totalSkipped, setTotalSkipped] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileParsed = (
    selectedFile: File,
    data: CSVRecord[]
  ) => {
    setFile(selectedFile);
    setCsvData(data);
    setRecords([]);
    setSkippedRecords([]);
    setTotalImported(0);
    setTotalSkipped(0);
    setError("");
  };

  const handleConfirmImport = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/import`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result: ImportResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to process CSV file"
        );
      }

      setRecords(result.records);
      setSkippedRecords(result.skippedRecords);
      setTotalImported(result.totalImported);
      setTotalSkipped(result.totalSkipped);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to process CSV file"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 transition-colors dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI-Powered CSV Importer
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Upload your CSV file to import CRM leads.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <CSVUploader onFileParsed={handleFileParsed} />

        {file && (
          <div className="mt-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
            <p className="font-medium text-gray-900 dark:text-white">
              {file.name}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <CSVPreview data={csvData} />

        {csvData.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleConfirmImport}
              disabled={loading}
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing with AI..." : "Confirm Import"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <ParsedResult
          records={records}
          skippedRecords={skippedRecords}
          totalImported={totalImported}
          totalSkipped={totalSkipped}
        />
      </div>
    </main>
  );
}
