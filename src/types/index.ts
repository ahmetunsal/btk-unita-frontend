



export interface IUser {
    id: string;
    email: string;
    username: string;
    role: string;
}


export type QuestionType = "single" | "multiple" | "ranking" | "likert" | "number"; 

export interface IQuestion {
    id: string;
    title: string;
    description?: string;
    type: QuestionType;
    options: string[];
}

export interface IAnswer {
    questionId: string;
    answer: string | string[];
}

export const questionTypeValues = {
    single: "Tekli Seçim",
    multiple: "Çoklu Seçim",
    ranking: "Sıralama",
    likert: "Likert",
    number: "Sayı"
} as const;
