import { QuestionAnsweredState } from './state/QuestionAnsweredState';
import { QuestionAskedState } from './state/QuestionAskedState';
import { QuizFinishedState } from './state/QuizFinishedState';
import { QuizNotYetStartedState } from './state/QuizNotYetStartedState';
import { RoundFinishedState } from './state/RoundFinishedState';
import { RoundStartedState } from './state/RoundStartedState';

export interface Round {
  roundName: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
  options?: string[];
}

export type QuizState =
  | QuizNotYetStartedState
  | RoundStartedState
  | RoundFinishedState
  | QuestionAskedState
  | QuestionAnsweredState
  | QuizFinishedState;

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
