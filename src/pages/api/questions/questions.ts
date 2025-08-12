import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Question = {
  id: string;
  title: string;
  description?: string;
  type: string;
  options: string[];
};

type ResponseData = {
  message: string;
  questions?: Question[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    return res.status(500).json({ message: "API URL is not configured" });
  }

  try {
    const response = await axios.get(`${API_URL}/questions`);

    if (!response || !response.data) {
      return res.status(500).json({ message: "Questions.GET failed" });
    }

    return res.status(200).json({
      message: "Question data received successfully",
      questions: response.data || [],
    });
  } catch (error) {
    console.error("Questions.GET error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
