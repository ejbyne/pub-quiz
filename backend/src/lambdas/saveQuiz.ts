import { Handler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { QuizRepository } from '../repositories/QuizRepository';
import { Quiz } from '../domain/Quiz';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';

interface Event {
  arguments: {
    input: {
      quizName: string;
      rounds: {
        roundName: string;
        questions: {
          text: string;
          answer: string;
          options?: string[];
        }[];
      }[];
    };
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const saveQuiz: Handler<Event> = async (event): Promise<boolean> => {
  const { quizName, rounds } = event.arguments.input;
  const quizId = uuid();

  console.log(`Saving quiz with name ${quizName} and id ${quizId}`);

  const newQuiz = new Quiz(
    quizId,
    quizName,
    rounds,
    new QuizNotYetStarted(rounds)
  );

  await quizRepository.save(newQuiz);

  return true;
};
