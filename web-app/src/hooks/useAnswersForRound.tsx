import { Round } from '@pub-quiz/shared/src/domain/quizTypes';
import { useContext } from 'react';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';

export const useAnswersForRound = (round: Round) => {
  const [answerSheet, updateAnswerSheet] = useContext(AnswerSheetContext);
  const answers = answerSheet.rounds[round.roundNumber];
  const playerName = answerSheet.playerName;
  return { updateAnswerSheet, answers, playerName };
};
