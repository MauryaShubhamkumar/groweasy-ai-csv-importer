import { CRMRecord } from "@/types/crm";

interface ParsedResultProps {
  records: CRMRecord[];
  skippedRecords: Record<string, string>[];
  totalImported: number;
  totalSkipped: number;
}

export default function ParsedResult({
  records,
  skippedRecords,
  totalImported,
  totalSkipped,
}: ParsedResultProps) {
  if (!records.length && totalSkipped === 0) return null;

  const headers: (keyof CRMRecord)[] = [
    "created_at",
    "name",
    "email",
    "country_code",
    "mobile_without_country_code",
    "company",
    "city",
    "state",
    "country",
    "lead_owner",
    "crm_status",
    "crm_note",
    "data_source",
    "possession_time",
    "description",
  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Parsed CRM Records
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Imported</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {totalImported}
          </p>
        </div>

        <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Skipped</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {totalSkipped}
          </p>
        </div>
      </div>

      <div className="mt-6 max-h-[500px] overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
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
            {records.map((record, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="max-w-[250px] truncate whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-300"
                  >
                    {record[header] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {skippedRecords.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Skipped Records
          </h2>

          <div className="max-h-[400px] overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-max w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
                <tr>
                  {Object.keys(skippedRecords[0] || {}).map((header) => (
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
                {skippedRecords.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                    {Object.keys(skippedRecords[0] || {}).map((header) => (
                      <td
                        key={header}
                        className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-300"
                      >
                        {record[header] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
