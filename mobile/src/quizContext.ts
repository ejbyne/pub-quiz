import { createContext, Dispatch } from "react";
import { Quiz } from "./domain/quizReducer";

export const QuizContext = createContext<
  [Partial<Quiz>, Dispatch<Partial<Quiz>>]
>(undefined as any);
