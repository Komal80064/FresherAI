import llm from "../config/llm.js";
import feedbackPrompt from "../prompt/feedbackPrompt.js";


export const feedbackAgent = async(data)=>{
    let response;
    try {
        const prompt = feedbackPrompt(data)

        response = await llm.invoke(prompt)
        const cleaned = response.content.replace(/```/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleaned)
    } catch (error) {
        console.log("Feedback agent parse error");
        console.log(response.content);
        throw new Error("Failed to generate feedback");

    }
}