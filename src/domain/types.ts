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

export type QuizState =
  | QuizNotYetStarted
  | RoundStarted
  | QuestionAsked
  | Quiz_Finished;

export interface QuizNotYetStarted {
  status: QuizStatus.QUIZ_NOT_YET_STARTED;
}

export interface RoundStarted {
  status: QuizStatus.ROUND_STARTED;
  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;
}

export interface QuestionAsked {
  status: QuizStatus.QUESTION_ASKED;
  roundNumber: number;
  questionNumber: number;
  questionText: string;
}

export interface Quiz_Finished {
  status: QuizStatus.QUIZ_FINISHED;
}
