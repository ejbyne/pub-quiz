import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { QuizState, QuizStatus } from '../domain/state/QuizState';
import { mapQuizStateToResponseState } from './mapQuizStateToResponseState';

interface Event {
  arguments: {
    quizId: string;
  };
}

interface QuizSummaryResponse {
  quizId: string;
  quizName: string;
  playerNames?: string[];
  state: {
    __typename: string;
    quizId: string;
    status: QuizStatus;
    roundNumber?: number;
    roundName?: string;
    numberOfQuestions?: number;
    questionNumber?: number;
    questionText?: string;
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const quizSummary: Handler<Event> = async (
  event: Event
): Promise<QuizSummaryResponse> => {
  const { quizId } = event.arguments;

  console.log(`Getting summary for quiz with id ${quizId}`);

  const { quizName, playerNames, state } = await quizRepository.get(quizId);

  return {
    quizId,
    quizName,
    playerNames,
    state: mapQuizStateToResponseState(quizId, state),
  };
};
