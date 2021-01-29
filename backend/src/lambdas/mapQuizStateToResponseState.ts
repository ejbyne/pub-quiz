import { QuizState, QuizStatus } from '../domain/types';
import { NextStateEvent } from './nextQuizState';

export const mapQuizStateToResponseState = (
  quizId: string,
  state: QuizState
): NextStateEvent => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return {
        __typename: 'QuizNotYetStarted',
        quizId,
        status: QuizStatus.QUIZ_NOT_YET_STARTED,
      };

    case QuizStatus.ROUND_STARTED:
      return {
        __typename: 'RoundStarted',
        quizId,
        status: QuizStatus.ROUND_STARTED,
        roundSummary: state.roundSummary,
      };

    case QuizStatus.ROUND_FINISHED:
      return {
        __typename: 'RoundFinished',
        quizId,
        status: QuizStatus.ROUND_FINISHED,
        roundSummary: state.roundSummary,
      };

    case QuizStatus.QUESTION_ASKED:
      return {
        __typename: 'QuestionAsked',
        quizId,
        status: QuizStatus.QUESTION_ASKED,
        roundSummary: state.roundSummary,
        questionNumber: state.questionNumber,
        questionText: state.questionText,
        questionOptions: state.questionOptions,
      };

    case QuizStatus.QUESTION_ANSWERED:
      return {
        __typename: 'QuestionAnswered',
        quizId,
        status: QuizStatus.QUESTION_ANSWERED,
        roundSummary: state.roundSummary,
        questionNumber: state.questionNumber,
        questionText: state.questionText,
        questionAnswer: state.questionAnswer,
        questionOptions: state.questionOptions,
      };

    case QuizStatus.QUIZ_FINISHED:
      return {
        __typename: 'QuizFinished',
        quizId,
        status: QuizStatus.QUIZ_FINISHED,
      };

    default:
      throw new Error('Invalid quiz state provided');
  }
};
