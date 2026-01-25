import "dotenv/config";
import { runAgent } from "./agent.js";

async function main() {
    const userInput = "给我一个关于香港树木风险的新闻研究简报";

    try {
        const result = await runAgent(userInput);
        console.log("Agent output:");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("Error running agent:", error);
    }
}

main();