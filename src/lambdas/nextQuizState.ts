import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { QuizStatus } from '../domain/state/QuizState';

interface Event {
  arguments: {
    input: {
      quizId: string;
    };
  };
}

interface NextStateEvent {
  quizId: string;
  status: QuizStatus;
  roundNumber?: number;
  roundName?: string;
  numberOfQuestions?: number;
  questionNumber?: number;
  questionText?: string;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const nextState: Handler<Event> = async (
  event: Event
): Promise<NextStateEvent> => {
  const { quizId } = event.arguments.input;

  const quiz = await quizRepository.get(quizId);

  const nextState = quiz.nextState;

  console.log(
    `Updating state for quiz with id ${quizId} to ${nextState.status}`
  );

  await quizRepository.updateState(quizId, nextState);

  return {
    quizId,
    ...nextState,
  };
};
