import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinished } from './QuizFinished';
import { RoundStarted } from './RoundStarted';

export class QuestionAnswered extends BaseQuizState {
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
        return new QuizFinished(this.rounds);
      }

      return new RoundStarted(this.rounds, this.nextRoundWithQuestions);
    }

    return new QuestionAnswered(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
