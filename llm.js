// llm.js
// return callLLM function and the function return type is string

import { VertexAI } from "@google-cloud/vertexai";

// 初始化Vertex AI 客户端（一次就够）
const vertex = new VertexAI({
  project: "vertex-483206",
  location: "us-central1",
});

const model = vertex.getGenerativeModel({
  model: "gemini-2.5-flash",
});

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

// test
// callLLM("你好！").then(console.log).catch(console.error);