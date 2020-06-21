export interface Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  playerNames?: string[];
  status: QuizStatus;
  progress?: {
    roundNumber: number;
    questionNumber: number;
  };
}

export enum QuizStatus {
  NOT_YET_STARTED,
  IN_PROGRESS,
  FINISHED,
}

export interface Round {
  roundName: string;
  questions: Question[];
}

interface Question {
  question: string;
  answer: string;
}
