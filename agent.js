// agent.js
import { designAgent } from "./agents/designAgent.js";
import { writingAgent } from "./agents/writingAgent.js";

// Orchestrator
// 不负责智能，只负责流程
export async function runAgent(userInput) {
  // Step 1：写作阶段 —— 生成完整文章
  const article = await designAgent(userInput);

  // Step 2：设计阶段 —— 根据文章生成网页结构
  const pageStructure = await writingAgent(article);

  return {
    article,
    pageStructure,
  };
}
