import { QuizRepository } from '../repositories/QuizRepository';

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

export const quizRepository = new QuizRepository(quizTableName);
