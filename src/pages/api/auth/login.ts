import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
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
    const { email, password } = req.body;

    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (!response || !response.data) {
      return res.status(500).json({ message: "Login failed" });
    }
    
    console.log("Login response:", response.data);

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
