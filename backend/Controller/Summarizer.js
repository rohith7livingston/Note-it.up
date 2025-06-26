const axios = require("axios");

const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

const summarizeText = async (text) => {
  const data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: 100,
      min_length: 30,
    },
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data[0].summary_text;
  } catch (error) {
    console.error("Hugging Face API Error:", error.response ? error.response.data : error.message);
    // Rethrow a more user-friendly error to be caught by our errorHandler
    throw new Error("The AI Summarizer is currently unavailable or experiencing issues. Please try again later.");
  }
};

module.exports = summarizeText;