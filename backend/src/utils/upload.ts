import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (_req, file, callback) => {
    if (
      file.mimetype === "text/csv" ||
      file.originalname.toLowerCase().endsWith(".csv")
    ) {
      callback(null, true);
      return;
    }

    callback(new Error("Only CSV files are allowed"));
  },
});
