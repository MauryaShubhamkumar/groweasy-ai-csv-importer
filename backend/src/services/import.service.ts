import { extractCRMRecords } from "./ai.service.js";
import type { CRMRecord } from "../types/crm.js";

const BATCH_SIZE = 20;

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
    const batch = records.slice(index, index + BATCH_SIZE);

    const result = await extractCRMRecords(batch);

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
