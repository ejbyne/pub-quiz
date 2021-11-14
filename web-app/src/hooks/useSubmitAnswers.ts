import { useSubmitAnswersMutation } from '@pub-quiz/shared/src/graphql/types';
import { useQuizState } from './useQuizState';
import { useCurrentRound } from './useCurrentRound';
import { useAnswersForRound } from './useAnswersForRound';

export function useSubmitAnswers() {
  const state = useQuizState();
  const round = useCurrentRound();
  const { answers, playerName } = useAnswersForRound(round);

  const [
    submitAnswers,
    { called: submitAnswersCalled },
  ] = useSubmitAnswersMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: playerName!,
        roundNumber: round.roundNumber,
        answers: answers?.map((answer) => answer?.answer ?? null) ?? [],
      },
    },
  });

  return { submitAnswers, submitAnswersCalled };
}
