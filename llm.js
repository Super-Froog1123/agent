export async function fakeLLM(input) {
  if (input.includes("2 + 3")) {
    return {
      action: {
        tool: "add",
        input: { a: 2, b: 3 }
      }
    };
  }

  return {
    final: "我不知道"
  };
}
