import { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import {
  QuestionAnswered,
  QuestionAsked,
} from '@pub-quiz/shared/src/graphql/types';

export const useCurrentRound = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as QuestionAsked | QuestionAnswered;
  return quiz.rounds[state.roundSummary.roundNumber];
};
