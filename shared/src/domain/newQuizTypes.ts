export type NewQuizAction =
  | QuizNameAmended
  | RoundAdded
  | RoundRemoved
  | RoundNameAmended
  | QuestionAdded
  | QuestionRemoved
  | QuestionAmended;

export interface QuizNameAmended {
  type: 'QuizNameAmended';
  payload: {
    quizName: string;
  };
}

export interface RoundAdded {
  type: 'RoundAdded';
}

export interface RoundRemoved {
  type: 'RoundRemoved';
  payload: {
    roundNumber: number;
  };
}

export interface RoundNameAmended {
  type: 'RoundNameAmended';
  payload: {
    roundNumber: number;
    roundName: string;
  };
}

export interface QuestionAdded {
  type: 'QuestionAdded';
  payload: {
    roundNumber: number;
  };
}

export interface QuestionRemoved {
  type: 'QuestionRemoved';
  payload: {
    roundNumber: number;
    questionNumber: number;
  };
}

export interface QuestionAmended {
  type: 'QuestionAmended';
  payload: {
    roundNumber: number;
    questionNumber: number;
    text: string;
    answer: string;
  };
}
