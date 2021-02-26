import { Handler } from 'aws-lambda';
import { QuizStatus } from '../domain/types';
import { QuizRepository } from '../repositories/QuizRepository';
import { nextQuizStateInteractor } from '../interactors/nextQuizStateInteractor';

interface Event {
  arguments: {
    input: {
      quizId: string;
    };
  };
}

export interface NextStateEvent {
  __typename: string;
  quizId: string;
  status: QuizStatus;
  roundSummary?: {
    roundNumber: number;
    roundName: string;
    numberOfQuestions: number;
  };
  question?: {
    number: number;
    text: string;
    options?: string[];
    answer?: string;
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const nextQuizStateLambda: Handler<Event> = async (
  event,
  _,
  callback
): Promise<NextStateEvent | void> => {
  const command = event.arguments.input;
  console.log(`Updating state for quiz with id ${command.quizId}`);
  try {
    return nextQuizStateInteractor(command, quizRepository);
  } catch (error) {
    callback(error.message);
  }
};
