import { IQuestion } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";


export const useQuestions = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions/questions");
        setQuestions(response.data.questions);
      } catch (error) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};
