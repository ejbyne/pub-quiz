import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { QuizStatus } from '../domain/state/QuizState';
import { mapQuizStateToResponseState } from './mapQuizStateToResponseState';

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
  questionNumber?: number;
  questionText?: string;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const nextQuizState: Handler<Event> = async (
  event,
  _,
  callback
): Promise<NextStateEvent | void> => {
  const { quizId } = event.arguments.input;

  try {
    const quiz = await quizRepository.get(quizId);

    const nextState = quiz.nextState;

    console.log(
      `Updating state for quiz with id ${quizId} to ${nextState.status}`
    );

    await quizRepository.updateState(quizId, nextState);

    return mapQuizStateToResponseState(quizId, nextState);
  } catch (error) {
    callback(error.message);
  }
};
