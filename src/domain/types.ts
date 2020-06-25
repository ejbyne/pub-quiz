import { Quiz } from './Quiz';

export interface Round {
  roundName: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
}

export enum QuizStatus {
  QUIZ_NOT_YET_STARTED = 'QUIZ_NOT_YET_STARTED',
  ROUND_STARTED = 'ROUND_STARTED',
  QUESTION_ASKED = 'QUESTION_ASKED',
  QUIZ_FINISHED = 'QUIZ_FINISHED',
}

export interface BaseQuizState {
  status: QuizStatus;
  nextState(): QuizState;
}

export type QuizState =
  | QuizNotYetStartedState
  | RoundStartedState
  | QuestionAskedState
  | QuizFinishedState;

export class QuizNotYetStartedState implements BaseQuizState {
  status: QuizStatus.QUIZ_NOT_YET_STARTED;

  constructor() {
    this.status = QuizStatus.QUIZ_NOT_YET_STARTED;
  }

  nextState(): QuizState {
    return this;
  }
}

export class RoundStartedState implements BaseQuizState {
  status: QuizStatus.ROUND_STARTED;

  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;

  constructor(
    roundNumber: number,
    roundName: string,
    numberOfQuestions: number
  ) {
    this.status = QuizStatus.ROUND_STARTED;
    this.roundNumber = roundNumber;
    this.roundName = roundName;
    this.numberOfQuestions = numberOfQuestions;
  }

  nextState(): QuizState {
    return this;
  }
}

export class QuestionAskedState implements BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  roundNumber: number;
  questionNumber: number;
  questionText: string;

  constructor(
    roundNumber: number,
    questionNumber: number,
    questionText: string
  ) {
    this.status = QuizStatus.QUESTION_ASKED;
    this.roundNumber = roundNumber;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
  }

  nextState(): QuizState {
    return this;
  }
}

export class QuizFinishedState implements BaseQuizState {
  status: QuizStatus.QUIZ_FINISHED;

  constructor() {
    this.status = QuizStatus.QUIZ_FINISHED;
  }

  nextState(): QuizState {
    return this;
  }
}
