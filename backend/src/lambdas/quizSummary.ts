import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { QuizStatus } from '../domain/state/BaseQuizState';
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
    roundSummary?: {
      roundNumber: number;
      roundName: string;
      numberOfQuestions: number;
    };
    questionNumber?: number;
    questionText?: string;
    questionOptions?: string[];
    answers?: {
      question: string;
      answer: string;
    }[];
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const quizSummary: Handler<Event> = async (
  event,
  _,
  callback
): Promise<QuizSummaryResponse | void> => {
  const { quizId } = event.arguments;

  try {
    console.log(`Getting summary for quiz with id ${quizId}`);

    const quiz = await quizRepository.get(quizId);

    const { quizName, playerNames, state } = quiz;

    return {
      quizId,
      quizName,
      playerNames,
      state: mapQuizStateToResponseState(quizId, state),
    };
  } catch (error) {
    callback(error.message);
  }
};
