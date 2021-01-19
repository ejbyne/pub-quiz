import { createContext, Dispatch } from 'react';
import { Quiz, QuizAction } from '../domain/types';

export const QuizContext = createContext<[Quiz, Dispatch<QuizAction>]>(
  undefined as any,
);