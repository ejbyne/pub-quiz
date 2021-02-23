import { Handler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { QuizRepository } from '../repositories/QuizRepository';
import { Quiz } from '../domain/Quiz';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';

interface Event {
  arguments: {
    input: {
      quizId: string;
      playerName: string;
      roundNumber: number;
      answers: {
        answer: string;
      }[];
    };
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const submitAnswers: Handler<Event> = async (
  event
): Promise<boolean> => {
  await quizRepository.saveAnswers(event.arguments.input);
  return true;
};
