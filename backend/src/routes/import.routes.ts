import { Router } from "express";
import { importCSV } from "../controllers/import.controller.js";
import { upload } from "../utils/upload.js";

const router = Router();

router.post(
  "/",
  upload.single("file"),
  importCSV
);

export default router;
