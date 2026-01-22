import { fakeLLM } from "./llm.js";
import { tools } from "./tools.js";

// agent.js是“控制中枢/编排器（orchestrator）”，它不负责聪明，只负责把事情按顺序做对。

// js中的export相当于java中的public
// js默认就是文件私有，除非export
// js模块的默认规则是：没export是“文件私有”（只能本文件使用）
// export了 = 公共API

export async function runAgent(userInput) {
  const decision = await fakeLLM(userInput);

  if (decision.action) {
    const { tool, input } = decision.action;
    const result = tools[tool](input);
    return `结果是 ${result}`;
  }

  return decision.final;
}
