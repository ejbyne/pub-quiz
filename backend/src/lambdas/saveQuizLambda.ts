import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { Quiz } from '../domain/Quiz';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';
import { saveQuizInteractor } from '../interactors/saveQuizInteractor';

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

export const saveQuizLambda: Handler<Event> = async (
  event
): Promise<boolean> => {
  const command = event.arguments.input;
  console.log(`Saving quiz with name ${command.quizName}`);
  return saveQuizInteractor(command, quizRepository);
};
