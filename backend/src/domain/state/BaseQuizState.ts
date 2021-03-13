import {
  AnswersByPlayerName,
  QuizState,
  QuizStatus,
  Round,
  RoundSummary,
} from '../types';

export class BaseQuizState {
  status: QuizStatus;
  rounds: Round[];
  answers: AnswersByPlayerName;
  roundNumber?: number;
  questionNumber?: number;

  constructor(
    status: QuizStatus,
    rounds: Round[],
    answers: AnswersByPlayerName,
    roundNumber?: number,
    questionNumber?: number
  ) {
    this.status = status;
    this.rounds = rounds;
    this.answers = answers;
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

  get question():
    | { number: number; text: string; options?: string[]; answer?: string }
    | undefined {
    return undefined;
  }

  get nextRoundWithQuestions(): number {
    return this.rounds.findIndex((round, index) => {
      if (this.roundNumber === undefined) {
        return round.questions.length > 0;
      }
      return index > this.roundNumber && round.questions.length > 0;
    });
  }

  get isLastQuestionInRound(): boolean | undefined {
    if (this.roundNumber === undefined || this.questionNumber === undefined) {
      return undefined;
    }
    return (
      this.questionNumber === this.rounds[this.roundNumber].questions.length - 1
    );
  }

  nextState(): QuizState {
    throw new Error('Needs to be implemented for specific state');
  }
}
