import { Handler } from 'aws-lambda';
import { QuizStatus } from '../domain/types';
import { nextQuizStateInteractor } from '../interactors/nextQuizStateInteractor';
import { quizRepository } from './config';

interface NextQuizStateRequest {
  arguments: {
    input: {
      quizId: string;
    };
  };
}

export interface NextQuizStateResponse {
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

export const nextQuizStateLambda: Handler<NextQuizStateRequest> = async (
  event,
  _,
  callback
): Promise<NextQuizStateResponse | void> => {
  const command = event.arguments.input;
  console.log(`Updating state for quiz with id ${command.quizId}`);
  try {
    return nextQuizStateInteractor(command, quizRepository);
  } catch (error) {
    callback(error.message);
  }
};
