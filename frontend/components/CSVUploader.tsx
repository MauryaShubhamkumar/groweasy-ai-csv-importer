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
  const [isParsing, setIsParsing] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);

  const handleFile = (file: File) => {
    setError("");
    setParsingProgress(0);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      return;
    }

    const parsedRecords: CSVRecord[] = [];

    setIsParsing(true);

    Papa.parse<CSVRecord>(file, {
      header: true,
      skipEmptyLines: true,
      chunkSize: 1024 * 256,

      chunk: (result) => {
        parsedRecords.push(...result.data);

        const cursor = result.meta.cursor;

        const progress = Math.min(
          Math.round((cursor / file.size) * 100),
          100
        );

        setParsingProgress(progress);
      },

      complete: () => {
        setIsParsing(false);
        setParsingProgress(100);

        if (!parsedRecords.length) {
          setError("CSV file is empty.");
          return;
        }

        onFileParsed(file, parsedRecords);
      },

      error: () => {
        setIsParsing(false);
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
        onClick={() => {
          if (!isParsing) {
            inputRef.current?.click();
          }
        }}
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

      {isParsing && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Parsing CSV...
            </span>

            <span className="font-medium text-gray-900 dark:text-white">
              {parsingProgress}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gray-900 transition-all duration-300 dark:bg-white"
              style={{
                width: `${parsingProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
