import { callLLM } from "../llm.js";

export async function designAgent(userInput) {

    const prompt = `
        你是一个文字写作 Agent。

        任务：
        - 根据用户需求生成一篇完整的研究简报文章（中文）
        - 你只输出文章正文（允许用Markdown标题 ##，允许列表）
        - 不输出HTML，不输出JSON，不输出代码块
        - 不超过500字

        文章结构要求（必须包含）：
        - 标题
        - 引言
        - 方法
        - 分析（可用要点或编号）
        - 讨论
        - 结论

        用户需求：
        ${userInput}

        请直接输出文章正文。
    `;

    return callLLM(prompt);
}