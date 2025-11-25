import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult, GeminiModel } from '../types';

// Helper to convert File to Base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeRosemaryHealth = async (
  symptoms: string, 
  imageFile: File
): Promise<DiagnosisResult> => {
  
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Image = await fileToGenerativePart(imageFile);

  const systemInstruction = `
    You are a warm, caring, and professional plant doctor specializing in Rosemary. 
    Your goal is to diagnose the plant's health based on the user's description and the provided image.
    
    Guidelines:
    1.  **Tone:** Warm, empathetic, encouraging, yet professional.
    2.  **Output Structure:** Strictly return JSON.
    3.  **Diagnosis:** Explain the root cause clearly.
    4.  **Solutions:** Provide actionable, step-by-step advice directly related to the diagnosis. Use short sentences.
    5.  **Language:** Korean (Hangul).
  `;

  const prompt = `
    User's description of symptoms: "${symptoms}"
    
    Please analyze the attached image of the rosemary and the symptoms described.
    Provide a diagnosis and a list of specific solutions.
    
    If the diagnosis is about water, focus strictly on watering techniques.
    If it's about pests, focus on pest control.
    
    Keep the solutions as short, single-sentence instructions for better readability.
  `;

  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosisTitle: {
              type: Type.STRING,
              description: "A short, 3-5 word title of the diagnosis (e.g., '과습으로 인한 뿌리 손상')",
            },
            diagnosisDescription: {
              type: Type.STRING,
              description: "A detailed but clear explanation of why this is happening.",
            },
            solutions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of actionable steps to fix the problem.",
            },
          },
          required: ["diagnosisTitle", "diagnosisDescription", "solutions"],
        },
      },
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text) as DiagnosisResult;
      return parsedData;
    } else {
      throw new Error("No response text received from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};