import {
  QuizSummary,
  RoundStarted,
  QuestionAsked,
  RoundFinished,
  QuizFinished,
} from '../graphql/types';
import { QuestionAnswered } from '../graphql/types';

export type Quiz = Partial<QuizSummary> & {
  rounds: Round[];
};

export interface Round {
  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;
  questions: Question[];
}

export interface Question {
  number: number;
  text: string;
  options?: string[] | null;
  answer?: string;
}

export type NextQuizState =
  | RoundStarted
  | QuestionAsked
  | QuestionAnswered
  | RoundFinished
  | QuizFinished;

export type QuizAction =
  | JoinedQuiz
  | QuizSummaryReceived
  | NextQuizStateReceived;

type JoinedQuiz = {
  type: 'JoinedQuiz';
  payload: {
    quizId: string;
  };
};

type QuizSummaryReceived = {
  type: 'QuizSummaryReceived';
  payload: QuizSummary;
};

type NextQuizStateReceived = {
  type: 'NextQuizStateReceived';
  payload: NextQuizState;
};
