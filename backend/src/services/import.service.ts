import { extractCRMRecords } from "./ai.service.js";
import type {
  AIExtractionResult,
  CRMRecord,
} from "../types/crm.js";

const BATCH_SIZE = 20;
const MAX_RETRIES = 3;

const processBatchWithRetry = async (
  batch: Record<string, string>[]
): Promise<AIExtractionResult> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `Processing AI batch - Attempt ${attempt}/${MAX_RETRIES}`
      );

      return await extractCRMRecords(batch);
    } catch (error) {
      lastError = error;

      console.error(
        `AI batch failed - Attempt ${attempt}/${MAX_RETRIES}`,
        error
      );

      if (attempt < MAX_RETRIES) {
        const delay = 1000 * attempt;

        console.log(`Retrying batch in ${delay}ms...`);

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("AI batch failed after maximum retries");
};

export const processRecords = async (
  records: Record<string, string>[]
) => {
  const parsedRecords: CRMRecord[] = [];
  const skippedRecords: Record<string, string>[] = [];

  for (
    let index = 0;
    index < records.length;
    index += BATCH_SIZE
  ) {
    const batch = records.slice(
      index,
      index + BATCH_SIZE
    );

    const result = await processBatchWithRetry(batch);

    parsedRecords.push(...result.records);
    skippedRecords.push(...result.skippedRecords);
  }

  return {
    records: parsedRecords,
    skippedRecords,
    totalImported: parsedRecords.length,
    totalSkipped: skippedRecords.length,
  };
};
