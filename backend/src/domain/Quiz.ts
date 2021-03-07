import { Question, QuizState, Round } from './types';

export class Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  state: QuizState;
  playerNames?: string[];
  answers: Record<string, { answer: string }[][]>;

  constructor(
    quizId: string,
    quizName: string,
    rounds: Round[],
    state: QuizState,
    playerNames?: string[],
    answers?: Record<string, { answer: string }[][]>
  ) {
    this.quizId = quizId;
    this.quizName = quizName;
    this.rounds = rounds;
    this.state = state;
    this.playerNames = playerNames;
    this.answers = answers ?? {};
  }

  get nextState(): QuizState {
    return this.state.nextState();
  }
}
