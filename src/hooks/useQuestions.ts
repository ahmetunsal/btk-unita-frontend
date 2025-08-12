import { IQuestion } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";


export const useQuestions = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions/questions");
        setQuestions(response.data.questions);
      } catch {
        // Handle error silently or add error handling if needed
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading };
};
