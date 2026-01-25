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
        你是一个网页生成 Agent（HTML Generator）。

        你的任务：
        - 将给定文章内容转换为一个“可直接打开的单文件HTML页面”
        - 必须把文章内容原样放进页面（允许按段落/标题拆分排版，但不得改写、总结、增删事实）
        - 你可以为排版添加必要的HTML结构（header/section/nav/article/footer等）与少量CSS美化
        - 不需要任何外部资源（不引入CDN，不引入图片，不引入JS框架）
        - 页面适合“新闻研究简报/专题”阅读体验

        严格输出规则（必须遵守）：
        - 只输出HTML源码本身
        - 不要使用Markdown
        - 不要输出 \`\`\`html 或任何代码块包裹
        - 不要添加任何解释文字、前言、后记

        输入文章（source of truth）：
        ${pageStructure}

        HTML要求：
        - 必须包含：<!doctype html>、<html>、<head>、<body>
        - <title> 使用文章标题（若识别不到，就用“研究简报”）
        - 生成一个顶部目录（TOC），链接到各部分锚点
        - 每个章节用 <section id="...">，标题用 <h2>
        - 正文用 <p>，列表用 <ul><li>
        - CSS：只写在 <style> 中，保持简洁（字体、行宽、间距）

        请立即输出完整HTML源码。
    `;

    return callLLM(prompt);
}