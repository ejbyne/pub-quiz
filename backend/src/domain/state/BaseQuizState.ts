import { QuizState, QuizStatus, Round, RoundSummary } from "../types";

export class BaseQuizState {
  status: QuizStatus;
  rounds: Round[];
  roundNumber?: number;
  questionNumber?: number;

  constructor(
    status: QuizStatus,
    rounds: Round[],
    roundNumber?: number,
    questionNumber?: number
  ) {
    this.status = status;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.questionNumber = questionNumber;
  }

  get roundSummary(): RoundSummary | undefined {
    if (this.roundNumber === undefined) {
      return undefined;
    }

    const round = this.rounds[this.roundNumber];

    return {
      roundNumber: this.roundNumber,
      roundName: round.roundName,
      numberOfQuestions: round.questions.length,
    };
  }

  nextState(): QuizState {
    throw new Error('Needs to be implemented for specific state');
  }
}
