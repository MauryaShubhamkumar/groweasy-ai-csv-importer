import { GoogleGenAI } from "@google/genai";
import { createCRMPrompt } from "../prompts/crm.prompt.js";
import type { AIExtractionResult } from "../types/crm.js";

export const extractCRMRecords = async (
  records: Record<string, string>[]
): Promise<AIExtractionResult> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const prompt = createCRMPrompt(records);

  const response = await ai.models.generateContent({
    // model: "gemini-2.5-flash",
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json", 
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("Empty AI response");
  }

  return JSON.parse(text) as AIExtractionResult;
};