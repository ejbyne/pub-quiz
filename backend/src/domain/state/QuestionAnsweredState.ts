import { Round } from '../Quiz';
import { QuizFinishedState } from './QuizFinishedState';
import { BaseQuizState, QuizState, QuizStatus } from './QuizState';
import { RoundStartedState } from './RoundStartedState';

export class QuestionAnsweredState implements BaseQuizState {
  status: QuizStatus;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    this.status = QuizStatus.QUESTION_ANSWERED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.questionNumber = questionNumber;
  }

  nextState(): QuizState {
    if (
      this.questionNumber ===
      this.rounds[this.roundNumber].questions.length - 1
    ) {
      const nextRoundWithQuestions = this.rounds.findIndex(
        (round, index) => index > this.roundNumber && round.questions.length > 0
      );

      if (nextRoundWithQuestions === -1) {
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
}
