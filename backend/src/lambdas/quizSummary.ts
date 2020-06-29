import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { QuizState } from '../domain/state/QuizState';

interface Event {
  arguments: {
    input: {
      quizId: string;
    };
  };
}

interface QuizSummaryResponse {
  quizId: string;
  quizName: string;
  playerNames?: string[];
  state: QuizState;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const quizSummary: Handler<Event> = async (
  event: Event
): Promise<QuizSummaryResponse> => {
  const { quizId } = event.arguments.input;

  console.log(`Getting summary for quiz with id ${quizId}`);

  const { quizName, playerNames, state } = await quizRepository.get(quizId);

  return {
    quizId,
    quizName,
    playerNames,
    state,
  };
};
