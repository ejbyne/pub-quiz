import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { NextStateEvent } from './nextQuizStateLambda';
import { quizSummaryInteractor } from '../interactors/quizSummaryInteractor';

interface Event {
  arguments: {
    quizId: string;
  };
}

export interface QuizSummaryResponse {
  quizId: string;
  quizName: string;
  playerNames?: string[];
  state: NextStateEvent;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const quizSummaryLambda: Handler<Event> = async (
  event,
  _,
  callback
): Promise<QuizSummaryResponse | void> => {
  const { quizId } = event.arguments;

  try {
    console.log(`Getting summary for quiz with id ${quizId}`);
    return quizSummaryInteractor(event.arguments, quizRepository);
  } catch (error) {
    callback(error.message);
  }
};
