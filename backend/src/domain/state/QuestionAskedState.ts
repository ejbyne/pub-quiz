import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { RoundFinishedState } from './RoundFinishedState';

export class QuestionAskedState extends BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    super(QuizStatus.QUESTION_ASKED, rounds, roundNumber, questionNumber);
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound) {
      return new RoundFinishedState(this.rounds, this.roundNumber);
    }

    return new QuestionAskedState(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
