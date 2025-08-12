import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { QuestionType, questionTypeValues } from "@/types";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

const AddQuestionSheet = () => {
  const { user } = useAuth();
  const [options, setOptions] = useState<string[]>([]);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);

  const handleQuestionTypeChange = (value: QuestionType) => {
    console.log("Selected question type:", value);
    setQuestionType(value);
  };

  const handleAAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const questionId = formData.get("questionId") as string;
    const questionTitle = formData.get("questionTitle") as string;
    const questionDescription = formData.get("questionDescription") as string;
    const questionOptions = options.filter((option) => option.trim() !== "");

    if (!questionId || !questionTitle || !questionType) {
      console.error("Missing required fields:", {
        questionId,
        questionTitle,
        questionType,
      });
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    const questionData = {
      id: questionId,
      title: questionTitle,
      description: questionDescription,
      type: questionType,
      options: questionOptions,
      user
    };

    const response = await axios.post("/api/questions/submit", questionData);

    if (response.status === 200) {
      toast.success("Soru başarıyla eklendi.");
      setOptions([]);
      setQuestionType(null);
    } else {
      toast.error("Soru eklenirken bir hata oluştu.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Yeni Soru Ekle</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Yeni Soru Ekle</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col p-5">
          <form onSubmit={handleAAddQuestion} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Soru Id</Label>
              <Input id="questionId" name="questionId" type="text" placeholder="Örn. rankingType" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Soru</Label>
              <Input id="questionTitle" name="questionTitle" type="text" placeholder="Örn. Puan Türünü Seçin" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Açıklama</Label>
              <Input id="questionDescription" name="questionDescription" type="text" placeholder="Örn. AYT'den girmiş olduğunuz puan türünü işaretleyin." />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Soru Tipi</Label>
              <Select onValueChange={(value) => handleQuestionTypeChange(value as QuestionType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Soru Tipi Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(questionTypeValues).map((type) => (
                    <SelectItem key={type} value={type}>
                      {questionTypeValues[type as QuestionType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>(Varsa) Opsiyonları Ekleyin</Label>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setOptions((prev) => [...prev, ""])}
              >
                Opsiyon Ekle
              </Button>
              <div className="max-h-full overflow-y-scroll flex flex-col gap-2 border border-dashed border-gray-300 rounded-md p-2">
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <div key={index} className="w-full flex items-center gap-2">
                      <Input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...options];
                          newOptions[index] = e.target.value;
                          setOptions(newOptions);
                        }}
                        className="w-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          setOptions((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Sil
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-sm text-center text-gray-500">
                    Opsiyon yok
                  </div>
                )}
              </div>
              <div className="flex">
                <Button type="submit" className="w-full">
                  Soru Ekle
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddQuestionSheet;
