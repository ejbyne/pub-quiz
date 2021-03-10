import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuestionAsked } from './QuestionAsked';

export class RoundStarted extends BaseQuizState {
  status: QuizStatus.ROUND_STARTED;
  rounds: Round[];
  answers: AnswersByPlayerName;
  roundNumber: number;

  constructor(
    rounds: Round[],
    answers: AnswersByPlayerName,
    roundNumber: number
  ) {
    super(QuizStatus.ROUND_STARTED, rounds, answers, roundNumber);
  }

  nextState(): QuizState {
    return new QuestionAsked(this.rounds, this.answers, this.roundNumber, 0);
  }
}
