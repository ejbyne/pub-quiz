import { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import {
  QuestionAnswered,
  QuestionAsked,
} from '@pub-quiz/shared/src/graphql/types';

export const useQuizState = () => {
  const [quiz] = useContext(QuizContext);
  return quiz.state as QuestionAsked | QuestionAnswered;
};
