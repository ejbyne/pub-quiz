import {
  AnswersByPlayerName,
  PlayerMarks,
  QuizState,
  QuizStatus,
  Round,
} from '../types';
import { BaseQuizState } from './BaseQuizState';
import { MarksCalculator } from '../MarksCalculator';

export class QuizFinished extends BaseQuizState {
  status: QuizStatus.QUIZ_FINISHED;
  rounds: Round[];
  answers: AnswersByPlayerName;

  constructor(rounds: Round[], answers: AnswersByPlayerName) {
    super(QuizStatus.QUIZ_FINISHED, rounds, answers);
  }

  get marks(): PlayerMarks[] {
    return new MarksCalculator(this.answers).calculateMarks();
  }

  nextState(): QuizState {
    return this;
  }
}
