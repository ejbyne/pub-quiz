import { Question, QuizState, QuizStatus, Round, RoundSummary } from "../types";

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

  get questionText(): string | undefined {
    return this.currentQuestion?.question;
  }

  get questionAnswer(): string | undefined {
    return this.currentQuestion?.answer;
  }

  get questionOptions(): string[] | undefined {
    return this.currentQuestion?.options;
  }

  private get currentQuestion(): Question | undefined {
    if (this.roundNumber === undefined || this.questionNumber === undefined) {
      return undefined;
    }
    return this.rounds[this.roundNumber].questions[this.questionNumber];
  }

  nextState(): QuizState {
    throw new Error('Needs to be implemented for specific state');
  }
}
