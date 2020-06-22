export interface Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  playerNames?: string[];
  status: QuizStatus;
  progress?: QuizProgress;
}

export enum QuizStatus {
  NOT_YET_STARTED,
  IN_PROGRESS,
  FINISHED,
}

export interface QuizProgress {
  roundNumber: number;
  questionNumber: number;
}

export interface Round {
  roundName: string;
  questions: Question[];
}

interface Question {
  question: string;
  answer: string;
}
