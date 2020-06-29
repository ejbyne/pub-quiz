import { QuizState, QuizStatus } from '../domain/state/QuizState';
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
        roundNumber: state.roundNumber,
        roundName: state.roundName,
        numberOfQuestions: state.numberOfQuestions,
      };

    case QuizStatus.ROUND_FINISHED:
      return {
        __typename: 'RoundFinished',
        quizId,
        status: QuizStatus.ROUND_FINISHED,
        roundNumber: state.roundNumber,
        roundName: state.roundName,
        numberOfQuestions: state.numberOfQuestions,
      };

    case QuizStatus.QUESTION_ASKED:
      return {
        __typename: 'QuestionAsked',
        quizId,
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: state.roundNumber,
        questionNumber: state.questionNumber,
        questionText: state.questionText,
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
