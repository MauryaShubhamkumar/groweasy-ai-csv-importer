"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CSVRecord } from "@/types/csv";

interface CSVPreviewProps {
  data: CSVRecord[];
}

export default function CSVPreview({
  data,
}: CSVPreviewProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 49,
    overscan: 10,
  });

  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        CSV Preview
      </h2>

      <div
        ref={parentRef}
        className="max-h-[450px] overflow-auto rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <table className="min-w-max w-full table-fixed text-sm">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="w-[250px] whitespace-nowrap border-b px-4 py-3 text-left font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {virtualRows.length > 0 && (
              <tr
                style={{
                  height: virtualRows[0].start,
                }}
              />
            )}

            {virtualRows.map((virtualRow) => {
              const row = data[virtualRow.index];

              return (
                <tr
                  key={virtualRow.key}
                  className="h-[49px] border-b dark:border-gray-800 dark:hover:bg-gray-900"
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="w-[250px] max-w-[250px] truncate whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-300"
                      title={row[header] || ""}
                    >
                      {row[header] || "-"}
                    </td>
                  ))}
                </tr>
              );
            })}

            {virtualRows.length > 0 && (
              <tr
                style={{
                  height:
                    rowVirtualizer.getTotalSize() -
                    virtualRows[
                      virtualRows.length - 1
                    ].end,
                }}
              />
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {data.length} records found
      </p>
    </div>
  );
}
