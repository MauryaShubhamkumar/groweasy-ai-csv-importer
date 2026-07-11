interface ProcessingIndicatorProps {
  totalRecords: number;
}

export default function ProcessingIndicator({
  totalRecords,
}: ProcessingIndicatorProps) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Processing CSV with AI
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Mapping {totalRecords} records to CRM fields
          </p>
        </div>

        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-white" />
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-full w-full animate-pulse bg-gray-900 dark:bg-white" />
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        AI is analyzing column names and record values...
      </p>
    </div>
  );
}
