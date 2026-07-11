import { CSVRecord } from "@/types/csv";

interface CSVPreviewProps {
  data: CSVRecord[];
}

export default function CSVPreview({ data }: CSVPreviewProps) {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        CSV Preview
      </h2>

      <div className="max-h-[450px] overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-max w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b px-4 py-3 text-left font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="max-w-[250px] truncate whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-300"
                  >
                    {row[header] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {data.length} records found
      </p>
    </div>
  );
}
