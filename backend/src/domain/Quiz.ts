import { QuizState } from './state/QuizState';

export interface Round {
  roundName: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
  options?: string[];
}
export class Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  state: QuizState;
  playerNames?: string[];

  constructor(
    quizId: string,
    quizName: string,
    rounds: Round[],
    state: QuizState,
    playerNames?: string[]
  ) {
    this.quizId = quizId;
    this.quizName = quizName;
    this.rounds = rounds;
    this.state = state;
    this.playerNames = playerNames;
  }

  get nextState(): QuizState {
    return this.state.nextState();
  }
}
