import { AnswersByPlayerName, QuizState, Round } from './types';

export class Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  state: QuizState;
  playerNames?: string[];
  answers: AnswersByPlayerName;

  constructor(
    quizId: string,
    quizName: string,
    rounds: Round[],
    state: QuizState,
    playerNames?: string[],
    answers?: AnswersByPlayerName
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
