"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import { CSVRecord } from "@/types/csv";

interface CSVUploaderProps {
  onFileParsed: (file: File, data: CSVRecord[]) => void;
}

export default function CSVUploader({
  onFileParsed,
}: CSVUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file: File) => {
    setError("");

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      return;
    }

    Papa.parse<CSVRecord>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (result) => {
        if (!result.data.length) {
          setError("CSV file is empty.");
          return;
        }

        onFileParsed(file, result.data);
      },

      error: () => {
        setError("Failed to parse CSV file.");
      },
    });
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          const file = e.dataTransfer.files[0];

          if (file) {
            handleFile(file);
          }
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition ${
          dragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
            : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />

        <div className="text-4xl">↑</div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Drop your CSV file here
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          or click to browse files
        </p>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
