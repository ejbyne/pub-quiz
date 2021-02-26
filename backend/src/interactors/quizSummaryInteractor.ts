import { QuizRepository } from '../repositories/QuizRepository';
import { mapQuizStateToResponseState } from './mapQuizStateToResponseState';
import { QuizSummaryResponse } from '../lambdas/quizSummaryLambda';

interface QuizSummaryCommand {
  quizId: string;
}

export const quizSummaryInteractor = async (
  command: QuizSummaryCommand,
  quizRepository: QuizRepository
): Promise<QuizSummaryResponse> => {
  const quiz = await quizRepository.get(command.quizId);

  const { quizId, quizName, playerNames, state } = quiz;

  return {
    quizId,
    quizName,
    playerNames,
    state: mapQuizStateToResponseState(quizId, state),
  };
};
