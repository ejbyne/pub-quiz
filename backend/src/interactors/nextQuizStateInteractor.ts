import { QuizRepository } from '../repositories/QuizRepository';
import { NextStateEvent } from '../lambdas/nextQuizStateLambda';
import { mapQuizStateToResponseState } from './mapQuizStateToResponseState';

interface NextQuizStateCommand {
  quizId: string;
}

export const nextQuizStateInteractor = async (
  { quizId }: NextQuizStateCommand,
  quizRepository: QuizRepository
): Promise<NextStateEvent> => {
  const quiz = await quizRepository.get(quizId);
  const nextState = quiz.nextState;
  await quizRepository.updateState(quizId, nextState);
  return mapQuizStateToResponseState(quizId, nextState);
};
