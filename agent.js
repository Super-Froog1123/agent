// agent.js
import { designAgent } from "./agents/designAgent.js";
import { writingAgent } from "./agents/writingAgent.js";

// Orchestrator
// 不负责智能，只负责流程
export async function runAgent(userInput) {
  // 设计阶段：页面结构
  const designResult = await designAgent(userInput);

  // 写作阶段：基于结构写内容
  const writingResult = await writingAgent(userInput, designResult);

  return {
    design: designResult,
    writing: writingResult,
  };
  
}