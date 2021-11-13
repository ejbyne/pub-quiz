import {
  QuestionAnswered,
  QuestionAsked,
  useSubmitMarksMutation,
} from '@pub-quiz/shared/src/graphql/types';
import { Round } from '@pub-quiz/shared/src/domain/quizTypes';
import { useContext } from 'react';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';

export function useSubmitMarks(
  state: QuestionAsked | QuestionAnswered,
  round: Round,
) {
  const [answerSheet] = useContext(AnswerSheetContext);
  const answers = answerSheet.rounds[round.roundNumber];

  const [submitMarks, { called: submitMarksCalled }] = useSubmitMarksMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: answerSheet.playerName!,
        roundNumber: round.roundNumber,
        marks: answers?.map((answer) => answer?.mark ?? null) ?? [],
      },
    },
  });
  return { submitMarks, submitMarksCalled };
}