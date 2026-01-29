import { callLLM } from "../llm.js";

function stripCodeBlock(text) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

export async function reporter(brief) {
  if (!brief || !brief.assignment || !brief.requirements) {
    throw new Error("ReporterAgent: invalid brief");
  }

  const prompt = `
你是一名新闻记者，请根据编辑提供的【写作任务说明】撰写新闻内容。
请【严格只返回 JSON】，不要有任何解释性文字。

每个任务说明模块不超过 100 字。

JSON 结构如下：
{
  "headline": "",
  "lede": "",
  "scene": "",
  "key_event": "",
  "background": "",
  "voices": [
    { "who": "", "quote": "" }
  ],
  "impact": "",
  "ending": ""
}

写作任务说明：
${JSON.stringify(brief, null, 2)}
`;

  const rawText = await callLLM(prompt);

  console.log("[ReporterAgent] Raw LLM Response:", rawText);

  const cleanedText = stripCodeBlock(rawText);

  let story;
  try {
    story = JSON.parse(cleanedText);
  } catch (err) {
    console.error("[ReporterAgent] JSON parse failed:", cleanedText);
    throw new Error("ReporterAgent: LLM returned invalid JSON");
  }

  return story;
}
