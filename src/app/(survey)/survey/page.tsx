"use client";

import Loading from "@/components/other/Loading";
import QuestionRenderer from "@/components/survey/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuestions } from "@/hooks/useQuestions";
import { IAnswer } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const SurveyPage = () => {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<IAnswer[]>([]);
  const [uniqueId, setUniqueId] = React.useState<string | null>(null);
  const { questions, loading } = useQuestions();

  useEffect(() => {
    const id = localStorage.getItem("uniqueId");
    if (id) {
      setUniqueId(id);
    } else {
      const newId = `unita-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("uniqueId", newId);
      setUniqueId(newId);
    }
  }, []);

  if (loading || !uniqueId) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    const payload = {
      uniqueId,
      answers
    };

    const response = await axios.post("api/survey/submit", payload);
    if (response.status === 200) {
      toast.success("Anket başarıyla gönderildi!");
      router.push("/survey/results");
    } else {
      toast.error("Anket gönderilirken bir hata oluştu.");
      console.error("Failed to submit survey");
    }

  }


  return (
    <div className="w-full h-screen relative flex flex-col items-center py-20 px-5">
      <div className="w-full h-10/12 md:w-1/2 flex flex-col items-center gap-20">
        <div className="flex gap-20">
          <h1 className="text-base text-center font-inter font-semibold md:text-3xl">
            UNITA - Üniversite Tercih Asistanı
          </h1>
        </div>
        <Card className="w-full h-full flex flex-col justify-between relative p-5">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-inter font-semibold">Soru</h2>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-inter font-medium">
                {questions[questionIndex]?.title || "No question available"}
              </h3>
              {questions[questionIndex]?.description && (
                <h4 className="text-sm font-inter text-gray-300">
                  {questions[questionIndex]?.description || ""}
                </h4>
              )}
            </div>
          </div>
          <div className="h-full flex flex-col overflow-y-auto">
            <QuestionRenderer
              questions={questions}
              questionIndex={questionIndex}
              questionType={questions[questionIndex]?.type}
              options={questions[questionIndex]?.options}
              answers={answers}
              setAnswers={setAnswers}
            />
          </div>
          <div className="flex items-center justify-between bg-zinc-900 py-1">
            <Button 
              variant={"outline"} 
              disabled={questionIndex === 0}
              onClick={() => {
                if (questionIndex > 0) {
                  setQuestionIndex(questionIndex - 1);
                }
              }}>
              Önceki
            </Button>

            <Button 
              variant={"outline"}
              onClick={() => {
                if (questionIndex < questions.length - 1) {
                  setQuestionIndex(questionIndex + 1);
                } else {
                  handleSubmit();
                }
              }}>
              {questionIndex < questions.length - 1 ? "Sonraki" : "Önerileri Al!"}
              </Button>
          </div>
        </Card>
      </div>
      <div className="absolute bottom-5 flex">
        <h6 className="text-sm font-inter font-medium">
          Benzersiz Kimliğiniz: {uniqueId}
        </h6>
      </div>
    </div>
  );
};

export default SurveyPage;
