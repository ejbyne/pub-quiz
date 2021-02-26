import { Round } from '../domain/types';
import { QuizRepository } from '../repositories/QuizRepository';
import { Quiz } from '../domain/Quiz';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';
import { v4 as uuid } from 'uuid';

interface SaveQuizCommand {
  quizName: string;
  rounds: Round[];
}

export const saveQuizInteractor = async (
  command: SaveQuizCommand,
  quizRepository: QuizRepository
): Promise<boolean> => {
  const newQuiz = new Quiz(
    uuid(),
    command.quizName,
    command.rounds,
    new QuizNotYetStarted(command.rounds)
  );
  await quizRepository.save(newQuiz);
  return true;
};
