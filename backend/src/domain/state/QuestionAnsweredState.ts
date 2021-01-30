import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinishedState } from './QuizFinishedState';
import { RoundStartedState } from './RoundStartedState';

export class QuestionAnsweredState extends BaseQuizState {
  status: QuizStatus.QUESTION_ANSWERED;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    super(QuizStatus.QUESTION_ANSWERED, rounds, roundNumber, questionNumber);
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound) {
      if (this.nextRoundWithQuestions === -1) {
        return new QuizFinishedState(this.rounds);
      }

      return new RoundStartedState(this.rounds, this.roundNumber + 1);
    }

    return new QuestionAnsweredState(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }

  private get isLastQuestionInRound(): boolean {
    return (
      this.questionNumber === this.rounds[this.roundNumber].questions.length - 1
    );
  }

  private get nextRoundWithQuestions(): number {
    return this.rounds.findIndex(
      (round, index) => index > this.roundNumber && round.questions.length > 0
    );
  }
}
