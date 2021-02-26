import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';

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

export const submitAnswersLambda: Handler<Event> = async (
  event
): Promise<boolean> => {
  await quizRepository.saveAnswers(event.arguments.input);
  return true;
};
