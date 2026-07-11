import type { Request, Response } from "express";
import { parseCSV } from "../services/csv.service.js";
import { processRecords } from "../services/import.service.js";

export const importCSV = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "CSV file is required",
      });

      return;
    }

    const records = parseCSV(req.file.buffer);

    if (!records.length) {
      res.status(400).json({
        success: false,
        message: "CSV file contains no records",
      });

      return;
    }

    const result = await processRecords(records);

    res.status(200).json({
      success: true,
      records: result.records,
      skippedRecords: result.skippedRecords,
      totalImported: result.totalImported,
      totalSkipped: result.totalSkipped,
    });
  } catch (error) {
    console.error("Import error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process CSV records",
    });
  }
};
