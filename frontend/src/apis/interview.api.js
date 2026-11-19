import api from "../utils/axios.js";

export const startInterview = async (data) => {
  try {
    const response = await api.post("/api/interview/start", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getInterview = async (id) => {
  try {
    const response = await api.get(`/api/interview/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const submitAnswer = async (data) => {
  try {
    const response = await api.post(`/api/interview/answer`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Submit Answer API Error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const getAllInterviews = async () => {
  try {
    const response = await api.get(`/api/interview/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    return null
  }
};
