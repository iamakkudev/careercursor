import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.OPENROUTER_KEY) {
  throw new Error("Missing OPENROUTER_KEY in environment variables.");
}

const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const safeOpenRouterCall = async (payload) => {
  try {
    //if safely return response
    const res = await openRouter.post("/chat/completions", payload);
    return ({data:res.data, fallback:false})
  } catch (err) {
    //if rate limit error
    if (err.response?.status === 429) {
      console.warn("Rate limited — retrying with fallback model...");
      payload.model = "deepseek/deepseek-chat-v3-0324:free";

      try {

      const retryRes = await openRouter.post("/chat/completions", payload);
      return { data: retryRes.data, fallback: true };

      //if not giving response anyway and throwing err
      } catch (retryErr) {
        // console.error("Retry failed:", retryErr);
        return { error: true, status: 429, message: "Rate limit even on fallback model." };
      }
    }
    //if nothing return

    console.error("OpenRouter call failed:", err.message);
    return { error: true, message: err.message, status: err.response?.status || 500, data: null };
  }
};
