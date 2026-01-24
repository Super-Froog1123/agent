// llm.js
import { VertexAI } from "@google-cloud/vertexai";

// 初始化Vertex AI 客户端（一次就够）
const vertex = new VertexAI({
  project: "vertex-483206",
  location: "us-central1",
});

// 获取一个生成式模型实例
// 注意：这里只是“选模型”，不是在生成内容
const model = vertex.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// LLM 能力层：prompt in -> raw text out
// 不关心角色，不关心任务，不关心输出格式
export async function callLLM(prompt) {

  // 处理异常
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt must be a non-empty string");
  }

  const result = await model.generateContent(prompt);

  const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No text returned from model");
  }

  return text;
};