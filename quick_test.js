import { VertexAI } from "@google-cloud/vertexai";
import path from "path";
import { fileURLToPath } from "url";
// key环境注入
import "dotenv/config";



// 测试用例
const userInput = "给我一个关于香港树木风险的新闻研究简报";


const PROMPT_TEMPLATE = `
You are an AI assistant.

Please respond directly to the user's request below.

Limit the response to within 300 words.

User request:
{{USER_INPUT}}
`;



// 兼容 ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 初始化 Vertex AI 客户端
// 账号
const vertex = new VertexAI({
  project: "vertex-483206",
  location: "us-central1",
});

// 模型型号
const model = vertex.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 调用模型
export async function vertexLLM(userInput) {
  // 构造 prompt
  const prompt = PROMPT_TEMPLATE.replace(
    "{{USER_INPUT}}",
    userInput
  );

  // 注入prompt，调用模型
  const result = await model.generateContent(prompt);

  const text =
    result.response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No text returned from model");
  }

  return text;;

}

// 重新修复解析逻辑
function extractJSON(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("Model output is empty or not a string");
  }

  // 1️⃣ 去掉 markdown code fences
  let text = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2️⃣ 如果整体就是 JSON，直接 parse
  try {
    return JSON.parse(text);
  } catch (_) {
    // 继续兜底
  }

  // 3️⃣ 兜底：提取第一个 {...}
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error(
      "No valid JSON object found in model output:\n" + raw
    );
  }

  return JSON.parse(match[0]);
}

// 主函数定义
async function main() {
    const userInput = "给我一个关于香港树木风险的新闻研究简报";

    // 调用 agent
    // 显示答案
    try {
        const result = await vertexLLM(userInput);
        console.log("LLM raw output:\n");
        console.log(result);
    } catch (error) {
        console.error("Error running agent:", error);
    }
}

// 执行主函数
main();