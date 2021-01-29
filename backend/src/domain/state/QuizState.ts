import { QuizNotYetStartedState } from './QuizNotYetStartedState';
import { RoundStartedState } from './RoundStartedState';
import { RoundFinishedState } from './RoundFinishedState';
import { QuestionAskedState } from './QuestionAskedState';
import { QuizFinishedState } from './QuizFinishedState';
import { Round } from '../Quiz';
import { QuestionAnsweredState } from './QuestionAnsweredState';

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

export interface BaseQuizState {
  status: QuizStatus;
  rounds: Round[];
  nextState(): QuizState;
}
