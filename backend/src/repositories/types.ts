import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { QuizStatus } from '../domain/state/BaseQuizState';
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
  roundSummary?: {
    roundNumber: number;
    roundName: string;
    numberOfQuestions: number;
  };
  questionNumber?: number;
  questionText?: string;
  questionAnswer?: string;
  questionOptions?: string[];
}
