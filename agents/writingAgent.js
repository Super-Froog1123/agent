// 为什么使用../?
// ..表示上一级目录
import { callLLM } from "../llm.js";

// 这里的${userInput}和${pageStructure}会被替换成实际的用户输入和页面结构
// 动态注入数据
// 构建上下文
// 提示词工程
    // 给模型定义角色
    // 提供上下文信息（页面结构）
    // 让模型基于这些信息生成内容

export async function writingAgent(userInput, pageStructure) {
    const prompt = `

        你是一个文字写作 Agent。
        你只负责写文案，不决定页面结构。

        页面结构：
        ${pageStructure}
    
        写出对应的标题和段落内容。

    `;

    return callLLM(prompt);
}