
import { resumeAgent } from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resume.model.js";
import redis from "../../../shared/redis/redis.js";
import { unlink } from "node:fs/promises";

export const uploadResume = async (req, res) => {
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    // Extract text from PDF
    const resumeText = await extractText(file.path);

    if (!resumeText?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the PDF",
      });
    }

    // Analyze resume using AI
    const aiResponse = await resumeAgent(resumeText);

    const resumeData =
      typeof aiResponse === "string"
        ? JSON.parse(aiResponse)
        : aiResponse;

    // Save or update resume
    let resume = await Resume.findOne({ userId });

    const resumeFields = {
      ...resumeData,
      userId,
      extractedText: resumeText,
    };

    if (resume) {
      Object.assign(resume, resumeFields);
      await resume.save();
    } else {
      resume = await Resume.create(resumeFields);
    }

    // Update Redis cache
    await redis.set(
      `resume:${userId}`,
      JSON.stringify(resume)
    );

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Upload resume error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Resume upload failed",
    });
  } finally {
    // Delete the temporary PDF whether upload succeeds or fails
    if (file?.path) {
      try {
        await unlink(file.path);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Resume cleanup error:", error.message);
        }
      }
    }
  }
};

export const getResume = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    // Check Redis first
    const cache = await redis.get(`resume:${userId}`);

    if (cache) {
      return res.status(200).json({
        success: true,
        source: "redis",
        data: JSON.parse(cache),
      });
    }

    // If not cached, check MongoDB
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Save result in Redis
    await redis.set(
      `resume:${userId}`,
      JSON.stringify(resume)
    );

    return res.status(200).json({
      success: true,
      source: "mongoDb",
      data: resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch resume",
    });
  }
};
