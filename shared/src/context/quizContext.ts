import { createContext, Dispatch } from 'react';
import { Quiz, QuizAction } from '../domain/quizTypes';

export const QuizContext = createContext<[Quiz, Dispatch<QuizAction>]>(
  undefined as any,
);
