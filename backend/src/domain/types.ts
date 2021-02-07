import { QuestionAnswered } from './state/QuestionAnswered';
import { QuestionAsked } from './state/QuestionAsked';
import { QuizFinished } from './state/QuizFinished';
import { QuizNotYetStarted } from './state/QuizNotYetStarted';
import { RoundFinished } from './state/RoundFinished';
import { RoundStarted } from './state/RoundStarted';

export interface Round {
  roundName: string;
  questions: Question[];
}

export interface Question {
  text: string;
  answer: string;
  options?: string[];
}

export type QuizState =
  | QuizNotYetStarted
  | RoundStarted
  | RoundFinished
  | QuestionAsked
  | QuestionAnswered
  | QuizFinished;

export enum QuizStatus {
  QUIZ_NOT_YET_STARTED = 'QUIZ_NOT_YET_STARTED',
  ROUND_STARTED = 'ROUND_STARTED',
  ROUND_FINISHED = 'ROUND_FINISHED',
  QUESTION_ASKED = 'QUESTION_ASKED',
  QUESTION_ANSWERED = 'QUESTION_ANSWERED',
  QUIZ_FINISHED = 'QUIZ_FINISHED',
}

export interface RoundSummary {
  roundName: string;
  roundNumber: number;
  numberOfQuestions: number;
}
