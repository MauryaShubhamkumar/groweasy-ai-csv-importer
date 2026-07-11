import type { NextFunction, Request, Response } from "express";
import multer from "multer";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  if (error instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: error.message,
    });

    return;
  }

  if (error.message === "Only CSV files are allowed") {
    res.status(400).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
