import { callLLM } from "../llm.js";

export async function designAgent(userInput) {
    const prompt = `

        你是一个网页设计 Agent。
        你的任务是输出页面结构和组件设计，不写具体文案。

        用户需求：
        ${userInput}

        请用 JSON 输出页面结构。
        
    `;

    return callLLM(prompt);
}