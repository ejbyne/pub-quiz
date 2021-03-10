import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';

export class QuizFinished extends BaseQuizState {
  status: QuizStatus.QUIZ_FINISHED;
  rounds: Round[];
  answers: AnswersByPlayerName;

  constructor(rounds: Round[], answers: AnswersByPlayerName) {
    super(QuizStatus.QUIZ_FINISHED, rounds, answers);
  }

  nextState(): QuizState {
    return this;
  }
}
