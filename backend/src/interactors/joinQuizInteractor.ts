import { QuizRepository } from '../repositories/QuizRepository';
import { JoinQuizResponse } from '../lambdas/joinQuizLambda';

export interface JoinQuizCommand {
  quizId: string;
  playerName: string;
  reconnect?: boolean;
}

export const joinQuizInteractor = async (
  { quizId, playerName }: JoinQuizCommand,
  quizRepository: QuizRepository
): Promise<JoinQuizResponse> => {
  await quizRepository.addPlayerName(quizId, playerName);
  return {
    quizId,
    playerName,
  };
};
