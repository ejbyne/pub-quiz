import { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { useQuizSummaryQuery } from '@pub-quiz/shared/src/graphql/types';

export const useLoadQuizSummary = () => {
  const [quiz, updateQuiz] = useContext(QuizContext);

  useQuizSummaryQuery({
    variables: {
      quizId: quiz?.quizId as any,
    },
    onCompleted: (data) => {
      const quizSummary = data?.quizSummary;
      if (quizSummary) {
        updateQuiz({ type: 'QuizSummaryReceived', payload: quizSummary });
      }
    },
    skip: !quiz.quizId,
  });
};
