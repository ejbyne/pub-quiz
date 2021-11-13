import {
  QuestionAnswered,
  QuestionAsked,
  useSubmitAnswersMutation,
} from '@pub-quiz/shared/src/graphql/types';
import { Round } from '@pub-quiz/shared/src/domain/quizTypes';
import { useContext } from 'react';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';

export function useSubmitAnswers(
  state: QuestionAsked | QuestionAnswered,
  round: Round,
) {
  const [answerSheet] = useContext(AnswerSheetContext);
  const answers = answerSheet.rounds[round.roundNumber];

  const [
    submitAnswers,
    { called: submitAnswersCalled },
  ] = useSubmitAnswersMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: answerSheet.playerName!,
        roundNumber: round.roundNumber,
        answers: answers?.map((answer) => answer?.answer ?? null) ?? [],
      },
    },
  });

  return { submitAnswers, submitAnswersCalled };
}