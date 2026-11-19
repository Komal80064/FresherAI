import llm from "../config/llm.js";
import summaryPrompt from "../prompt/summaryPrompt.js";


export const summaryAgent = async(data)=>{
    try {
        const prompt = summaryPrompt(data)

        const response = await llm.invoke(prompt)
        const cleaned = response.content.replace(/```/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleaned)
    } catch (error) {
        console.log("Summary agent parse error");
        console.log(response.content);
        throw new Error("Failed to generate Summary");

    }
}