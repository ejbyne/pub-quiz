import { useSubmitMarksMutation } from '@pub-quiz/shared/src/graphql/types';
import { useQuizState } from './useQuizState';
import { useCurrentRound } from './useCurrentRound';
import { useAnswersForRound } from './useAnswersForRound';

export function useSubmitMarks() {
  const state = useQuizState();
  const round = useCurrentRound();
  const { answers, playerName } = useAnswersForRound(round);

  const [submitMarks, { called: submitMarksCalled }] = useSubmitMarksMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: playerName!,
        roundNumber: round.roundNumber,
        marks: answers?.map((answer) => answer?.mark ?? null) ?? [],
      },
    },
  });
  return { submitMarks, submitMarksCalled };
}
