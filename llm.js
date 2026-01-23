import { VertexAI } from "@google-cloud/vertexai";
import path from "path";
import { fileURLToPath } from "url";

// 兼容 ES module
// 这个是什么？
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vertex = new VertexAI({
  project: "vertex-483206",
  location: "us-central1",
});

// 这是传进来个什么东西？
const model = vertex.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function vertexLLM(userInput) {
  const prompt = `
    SYSTEM:
    You are a decision module in an agent system.

    CRITICAL RULES (must follow):
    - You MUST respond with valid JSON only.
    - Do NOT include explanations, markdown, or natural language.
    - Do NOT include code fences like \`\`\`.
    - If you cannot decide, return:
      { "final": "UNKNOWN" }

    OUTPUT FORMAT (choose one):

    Option A:
    {
      "action": {
        "tool": "tool_name",
        "input": { "key": "value" }
      }
    }

    Option B:
    {
      "final": "your answer"
    }

    USER INPUT:
    ${userInput}
  `;


  const result = await model.generateContent(prompt);
  const text =
  result.response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No text returned from model");
  }


  return JSON.parse(text);
}