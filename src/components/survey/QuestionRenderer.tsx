import React, { useEffect } from "react";
import { Input } from "../ui/input";
import SingleChoice from "./questionTypes/SingleChoice";
import { IAnswer, IQuestion } from "@/types";
import MultipleChoice from "./questionTypes/MultipleChoice";
import Ranking from "./questionTypes/Ranking";
import Likert from "./questionTypes/Likert";

type QuestionRendererProps = {
  questions: IQuestion[];
  questionIndex: number;
  questionType: string;
  options?: string[];
  answers: IAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<IAnswer[]>>;
};

const QuestionRenderer = ({
  questions,
  questionIndex,
  questionType,
  options,
  answers,
  setAnswers,
}: QuestionRendererProps) => {
  const currentQuestion = questions[questionIndex];

  const getCurrentAnswer = () => {
    return answers.find((answer) => answer.questionId === currentQuestion.id);
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const handleSingleChoiceSelect = (option: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questions[questionIndex]?.id
      );
      newAnswers.push({
        questionId: questions[questionIndex]?.id,
        answer: option,
      });
      return newAnswers;
    });
  };

  const handleMultipleChoiceSelect = (option: string, checked: boolean) => {
    setAnswers((prevAnswers) => {
      const currentAnswer = getCurrentAnswer();

      if (currentAnswer) {
        return prevAnswers.map((answer) =>
          answer.questionId === currentQuestion.id
            ? {
                ...answer,
                answer: checked
                  ? [...(answer.answer as string[]), option]
                  : (answer.answer as string[]).filter(
                      (label) => label !== option
                    ),
              }
            : answer
        );
      } else {
        return [
          ...prevAnswers,
          {
            questionId: currentQuestion.id,
            answer: checked ? [option] : [],
          },
        ];
      }
    });
  };

  const handleRankingChange = (ranking: string[]) => {
    setAnswers((prevAnswers) => {
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== currentQuestion.id
      );

      return [
        ...filteredAnswers,
        { questionId: currentQuestion.id, answer: ranking },
      ];
    });
  };

  const handleLikertSelect = (value: string) => {
    setAnswers((prevAnswers) => {
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== currentQuestion.id
      );
      
      return [...filteredAnswers, { questionId: currentQuestion.id, answer: value }];
    });
  };

  switch (questionType) {
    case "number":
      return (
        <Input 
          type="number"
          placeholder="Örn: 235422"
          value={getCurrentAnswer()?.answer || ""}
          onChange={(e) => {
            setAnswers((prevAnswers) => {
              const filteredAnswers = prevAnswers.filter(
                (answer) => answer.questionId !== currentQuestion.id
              );

              return [
                ...filteredAnswers,
                { questionId: currentQuestion.id, answer: e.target.value },
              ];
            });
          }}
        />
      );

    case "single":
      return (
        <SingleChoice
          options={options!!}
          selectedOption={
            answers.find((answer) => answer.questionId === currentQuestion.id)
              ?.answer || ""
          }
          onOptionSelect={handleSingleChoiceSelect}
        />
      );

    case "multiple":
      return (
        <MultipleChoice
          options={options!!}
          selectedOptions={
            (answers.find((answer) => answer.questionId === currentQuestion.id)
              ?.answer as string[]) || []
          }
          onOptionSelect={handleMultipleChoiceSelect}
        />
      );

    case "ranking":
      return (
        <Ranking
          options={currentQuestion.options}
          selectedRanking={
            (answers.find((answer) => answer.questionId === currentQuestion.id)
              ?.answer as string[]) || []
          }
          onRankingChange={handleRankingChange}
        />
      );

    case "likert":
      return (
        <Likert
          selectedValue={((answers.find((answer) => answer.questionId === currentQuestion.id))?.answer as string) || ""}
          onValueSelect={handleLikertSelect}
          scale={5}
        />
      );
    default:
      return <div className="text-gray-500">Unsupported question type</div>;
  }
};

export default QuestionRenderer;
