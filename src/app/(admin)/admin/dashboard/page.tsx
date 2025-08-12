"use client";

import NotFound from "@/components/other/404";
import AddQuestionSheet from "@/components/sheets/AddQuestionSheet";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { IQuestion, questionTypeValues } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const { isAuthenticated } = useAuth();
  const [surveyData, setSuveyData] = useState();
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions/questions");
        if (!response.ok) {
          toast.error("Failed to fetch questions");
        }
        const data = await response.json();
        console.log("Fetched questions:", data);
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  if (!isAuthenticated) {
    return <NotFound />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col h-screen">
      <div className="w-full p-2 bg-zinc-900 border-b border-white/20">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-5">
      </div>
      <hr />
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-5 px-5">
          <h2 className="text-xl font-bold">Anket Soruları - {questions.length} Soru</h2>
          <div className="flex">
            <AddQuestionSheet />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <Card key={index} className="p-5">
                <CardTitle>{question.title}</CardTitle>
                <CardDescription>{question.description || "Açıklama Yok"}</CardDescription>
                <div>
                  <div className="flex">
                    <strong>{question.type ? questionTypeValues[question.type] : ""}</strong>
                  </div>
                  <div className="flex flex-col">
                    <strong>{question.options.length > 0 ? "Seçenekler:" : ""}</strong>
                    <ul className="list-disc pl-5">
                      {question.options.length > 0  ? question.options.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      )) : ""}
                    </ul>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">Henüz soru eklenmemiş.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
