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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    return res.status(500).json({ message: "API URL is not configured" });
  }

  try {
    const { id, title, description, type, options, user } = req.body;

    const response = await axios.post(`${API_URL}/questions`, {
      id,
      title,
      description,
      type,
      options,
    });

    console.log("Response status:", response.status);

    if (!response || !response.data) {
      return res.status(500).json({ message: "Login failed" });
    }

    return res.status(200).json({
      message: "Question create successful",
      questions: response.data.question || [],
    });
  } catch (error) {
    console.error("Questions.POST error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
