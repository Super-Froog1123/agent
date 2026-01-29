/**
 * WebEditor Agent (Flat Mode)
 * 将 Reporter 输出的 story 结构
 * 扁平化为前端可直接注入的 key-value 数据
 */

export async function webEditor(story) {
  console.log("[WebEditorAgent] Input story:", story);

  if (!story || typeof story !== "object") {
    throw new Error("WebEditorAgent: invalid story");
  }

  const {
    headline,
    lede,
    scene,
    key_event,
    background,
    voices,
    impact,
    ending
  } = story;

  console.log("[WebEditorAgent] Extracted fields:", {
    headline,
    lede,
    scene,
    key_event,
    background,
    voices,
    impact,
    ending
  });

  // 基本字段校验（最小防守）
  if (!headline || !lede) {
    console.error("[WebEditorAgent] Missing required fields", {
      headline,
      lede
    });
    throw new Error("WebEditorAgent: missing required fields");
  }

  const output = {
    headline,
    lede,
    scene,
    key_event,
    background,
    voices,
    impact,
    ending
  };

  console.log("[WebEditorAgent] Output view data:", output);

  return output;
}
