// agent.js
// 主流程控制文件，协调各个agent的调用
// 输入：input（用户请求数据）
// 输出：runAgentPipeline函数返回最终结果在data字段中

import { editor } from "./agents/editor.js";
import { reporter } from "./agents/reporter.js";
import { webEditor } from "./agents/webEditor.js";

export async function runAgentPipeline(input) {
  try {
    // Editor: 生成写作任务（brief）
    const brief = await editor(input);
    if (!brief) {
      throw new Error("Editor returned empty brief");
    }

    // Reporter：生成新闻内容
    const story = await reporter(brief);
    if (!story) {
      throw new Error("Reporter returned empty story");
    }

    // WebEditor：适配为前端可用的结构
    const viewData = await webEditor(story);

    if (!viewData) {
      throw new Error("WebEditor returned empty viewData");
    }

    // 返回最终结果
    return {
      status: "success",
      data: viewData
    };

  } catch (error) {
    console.error("[AgentPipeline Error]", error);

    return {
      status: "error",
      message: error.message
    };
  }
}