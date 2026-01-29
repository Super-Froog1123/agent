import { callLLM } from "../llm.js";

function stripCodeBlock(text) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

export async function editor(input) {
  if (!input || !input.topic) {
    throw new Error("EditorAgent: missing topic");
  }

  const prompt = `
你是一名新闻编辑，请将用户输入转化为【记者可执行的写作任务说明】。
请【只返回 JSON】，不要有任何解释性文字。

JSON 结构如下：
{
  "assignment": {
    "angle": "",
    "story_type": "storytelling",
    "focus": ""
  },
  "requirements": {
    "structure": "storytelling_v1",
    "must_include": [],
    "avoid": []
  }
}

用户输入：
${input.topic}
`;

  const rawText = await callLLM(prompt);

  console.log("[EditorAgent] Raw LLM Response:", rawText);

  const cleanedText = stripCodeBlock(rawText);

  let brief;
  try {
    brief = JSON.parse(cleanedText);
  } catch (err) {
    console.error("[EditorAgent] JSON parse failed:", cleanedText);
    throw new Error("EditorAgent: LLM returned invalid JSON");
  }

  return brief;
}