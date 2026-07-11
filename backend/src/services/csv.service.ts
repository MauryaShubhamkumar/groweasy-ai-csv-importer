import { parse } from "csv-parse/sync";

export type CSVRecord = Record<string, string>;

export const parseCSV = (buffer: Buffer): CSVRecord[] => {
  const csvContent = buffer.toString("utf-8");

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  }) as CSVRecord[];

  return records;
};
