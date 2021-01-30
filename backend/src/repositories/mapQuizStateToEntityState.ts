import { QuizState } from '../domain/types';
import { QuizEntityState } from './types';

export const mapQuizStateToEntityState = (
  state: QuizState
): QuizEntityState => ({
  status: state.status,
  roundNumber: state.roundNumber,
  questionNumber: state.questionNumber,
});
