import { QuizRepository } from '../repositories/QuizRepository';

export interface JoinQuizCommand {
  quizId: string;
  playerName: string;
  reconnect?: boolean;
}

export const joinQuizInteractor = async (
  { quizId, playerName }: JoinQuizCommand,
  quizRepository: QuizRepository
): Promise<{ quizId: string; playerName: string }> => {
  await quizRepository.addPlayerName(quizId, playerName);
  return {
    quizId,
    playerName,
  };
};
