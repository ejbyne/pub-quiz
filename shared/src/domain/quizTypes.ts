import {
  QuizSummary,
  RoundStarted,
  QuestionAsked,
  RoundFinished,
  QuizFinished,
  RoundMarked,
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
  | RoundFinished
  | QuestionAnswered
  | RoundMarked
  | QuizFinished;

export type QuizAction =
  | JoinedQuiz
  | QuizSummaryReceived
  | NextQuizStateReceived
  | PlayerJoined
  | PlayerSubmittedAnswers
  | PlayerSubmittedMarks;

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

type PlayerJoined = {
  type: 'PlayerJoined';
  payload: {
    quizId: string;
    playerName: string;
  };
};

type PlayerSubmittedAnswers = {
  type: 'PlayerSubmittedAnswers';
  payload: {
    quizId: string;
    playerName: string;
  };
};
type PlayerSubmittedMarks = {
  type: 'PlayerSubmittedMarks';
  payload: {
    quizId: string;
    playerName: string;
  };
};
