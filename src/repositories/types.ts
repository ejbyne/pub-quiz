import { QuizStatus } from '../domain/types';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
export interface QuizEntity {
  quizId: string;
  quizName: string;
  rounds: {
    roundName: string;
    questions: {
      question: string;
      answer: string;
    }[];
  }[];
  state: QuizEntityState;
  playerNames?: DocumentClient.DynamoDbSet;
}

export interface QuizEntityState {
  status: QuizStatus;
  roundNumber?: number;
  roundName?: string;
  numberOfQuestions?: number;
  questionNumber?: number;
  questionText?: string;
}
