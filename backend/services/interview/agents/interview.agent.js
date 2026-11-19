import llm from "../config/llm.js";
import hrInterviewPrompt from "../prompt/hrInterviewPrompt.js";
import technicalInterviewPrompt from "../prompt/technicalInterviewPrompt.js";

// Make sure llm is initialized or imported
// from your existing LLM configuration.

export const interviewAgent = async (data) => {
  try {
    const prompt =
      data.type?.toLowerCase() === "hr"
        ? hrInterviewPrompt(data)
        : technicalInterviewPrompt(data);

    const aiResponse = await llm.invoke(prompt);

    // Declare content before using it
    let content = aiResponse.content;

    // Handle array-based response
    if (Array.isArray(content)) {
      content = content
        .map((item) => (typeof item === "string" ? item : item.text || ""))
        .join("");
    }

    // Remove Markdown code fences
    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsedResponse = JSON.parse(cleaned);

    if (!Array.isArray(parsedResponse)) {
      throw new Error("AI response must be an array of questions");
    }

    if (parsedResponse.length === 0) {
      throw new Error("AI generated an empty question list");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Interview Agent Error:", error);
    throw error;
  }
};
