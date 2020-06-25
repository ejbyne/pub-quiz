import { Handler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { QuizRepository } from '../repositories/QuizRepository';
import { QuizStatus, QuizNotYetStartedState } from '../domain/types';
import { Quiz } from '../domain/Quiz';

interface Event {
  arguments: {
    input: {
      quizName: string;
      rounds: {
        roundName: string;
        questions: {
          question: string;
          answer: string;
        }[];
      }[];
    };
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const saveQuiz: Handler<Event> = async (
  event: Event
): Promise<boolean> => {
  const { quizName, rounds } = event.arguments.input;

  console.log(`Saving quiz: ${quizName}`);

  const newQuiz = new Quiz(
    uuid(),
    quizName,
    rounds,
    new QuizNotYetStartedState()
  );

  await quizRepository.save(newQuiz);

  return true;
};
