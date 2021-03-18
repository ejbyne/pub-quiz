import { QuestionAnswered } from './state/QuestionAnswered';
import { QuestionAsked } from './state/QuestionAsked';
import { QuizFinished } from './state/QuizFinished';
import { QuizNotYetStarted } from './state/QuizNotYetStarted';
import { RoundFinished } from './state/RoundFinished';
import { RoundStarted } from './state/RoundStarted';
import { RoundMarked } from './state/RoundMarked';

export interface Round {
  roundName: string;
  questions: Question[];
}

export interface Question {
  text: string;
  answer: string;
  options?: string[];
}

export interface Answer {
  answer?: string;
  mark?: number;
}

export type AnswersByPlayerName = Record<string, Answer[][]>;

export interface PlayerMarks {
  playerName: string;
  rounds: {
    marks: number[];
    roundTotal: number;
  }[];
  quizTotal: number;
}

export interface Player {
  name: string;
  status: PlayerStatus;
}

export enum PlayerStatus {
  PLAYING = 'PLAYING',
  ANSWERS_SUBMITTED = 'ANSWERS_SUBMITTED',
  MARKS_SUBMITTED = 'MARKS_SUBMITTED',
}

export type QuizState =
  | QuizNotYetStarted
  | RoundStarted
  | RoundFinished
  | QuestionAsked
  | QuestionAnswered
  | RoundMarked
  | QuizFinished;

export enum QuizStatus {
  QUIZ_NOT_YET_STARTED = 'QUIZ_NOT_YET_STARTED',
  ROUND_STARTED = 'ROUND_STARTED',
  ROUND_FINISHED = 'ROUND_FINISHED',
  QUESTION_ASKED = 'QUESTION_ASKED',
  QUESTION_ANSWERED = 'QUESTION_ANSWERED',
  ROUND_MARKED = 'ROUND_MARKED',
  QUIZ_FINISHED = 'QUIZ_FINISHED',
}

export interface RoundSummary {
  roundName: string;
  roundNumber: number;
  numberOfQuestions: number;
}
