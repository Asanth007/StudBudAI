import { GoogleGenAI } from "@google/genai";
import Instruction from './Instruction.txt?raw'
const realapiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log(realapiKey)
const ai = new GoogleGenAI({apiKey:realapiKey});

export async function getResposes(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: Instruction,
    },
  });
  return response.text
}
export default getResposes;

