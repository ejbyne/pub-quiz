import { Handler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { QuizRepository } from '../repositories/QuizRepository';
import { Quiz } from '../domain/Quiz';
import { QuizNotYetStartedState } from '../domain/state/QuizNotYetStartedState';
import { generateRounds } from '../quizApi';

interface Event {
  arguments: {
    input: {
      quizName: string;
    };
  };
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const generateRandomQuiz: Handler<Event> = async (event): Promise<string> => {
  const { quizName } = event.arguments.input;
  const quizId = uuid();
  const rounds = await generateRounds();

  console.log(
    `Saving quiz with name ${quizName}, id ${quizId} and rounds ${rounds}`
  );

  const newQuiz = new Quiz(
    quizId,
    quizName,
    rounds,
    new QuizNotYetStartedState(rounds)
  );

  await quizRepository.save(newQuiz);

  return quizId;
};
