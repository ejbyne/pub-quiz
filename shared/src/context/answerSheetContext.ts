import { createContext, Dispatch } from 'react';
import { AnswerSheet, AnswerSheetAction } from '../domain/answerSheetTypes';

export const AnswerSheetContext = createContext<[AnswerSheet, Dispatch<AnswerSheetAction>]>(
  undefined as any,
);
