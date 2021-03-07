import { QuizRepository } from '../repositories/QuizRepository';
import { mapQuizStateToResponseState } from './mapQuizStateToResponseState';
import { QuizSummaryResponse } from '../lambdas/quizSummaryLambda';
import { QuizState, QuizStatus } from '../domain/types';

interface QuizSummaryCommand {
  quizId: string;
}

interface CurrentRoundQuestion {
  number: number;
  text: string;
  options?: string[];
  answer?: string;
}

export const quizSummaryInteractor = async (
  command: QuizSummaryCommand,
  quizRepository: QuizRepository
): Promise<QuizSummaryResponse> => {
  const quiz = await quizRepository.get(command.quizId);

  const { quizId, quizName, playerNames, state } = quiz;

  return {
    quizId,
    quizName,
    playerNames,
    currentRound: mapCurrentRoundToCurrentRoundResponse(state),
    state: mapQuizStateToResponseState(quizId, state),
  };
};

const mapCurrentRoundToCurrentRoundResponse = (state: QuizState) => {
  const currentRound: CurrentRoundQuestion[] | undefined =
    state.status === QuizStatus.QUESTION_ASKED ||
    state.status === QuizStatus.QUESTION_ANSWERED
      ? state.currentRound
      : undefined;
  return currentRound?.map((question) => ({
    ...question,
    __typename: question.answer
      ? 'QuestionWithAnswer'
      : 'QuestionWithoutAnswer',
  }));
};
