import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';

interface Event {
  arguments: {
    input: {
      quizId: string;
    };
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const nextState: Handler<Event> = async (event: Event): Promise<any> => {
  const { quizId } = event.arguments.input;
};
