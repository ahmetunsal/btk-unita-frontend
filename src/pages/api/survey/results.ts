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
    const { uniqueId } = req.body;

    const response = await axios.get(`${API_URL}/surveys/${uniqueId}/recommendations`);

    console.log("Response status:", response.status);

    if (!response || !response.data) {
      return res.status(500).json({ message: "Recommendations.GET failed" });
    }

    console.log("Recommendations:", response.data.data);

    return res.status(200).json({
      message: "Recommendations retrieved successfully",
      questions: response.data.data || [],
    });
  } catch (error) {
    console.error("Survey.GET error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
