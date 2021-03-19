import { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import {
  usePlayerJoinedSubscription,
  usePlayerSubmittedAnswersSubscription,
  usePlayerSubmittedMarksSubscription,
  useQuizStateSubscription,
} from '@pub-quiz/shared/src/graphql/types';

export const useSubscribeToQuizUpdates = () => {
  const [quiz, updateQuiz] = useContext(QuizContext);

  useQuizStateSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const nextQuizState = data?.subscriptionData?.data?.nextQuizState;
      if (nextQuizState) {
        updateQuiz({ type: 'NextQuizStateReceived', payload: nextQuizState });
      }
    },
    skip: !quiz.quizId,
  });

  usePlayerJoinedSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const playerJoined = data?.subscriptionData?.data?.playerJoined;
      if (playerJoined) {
        updateQuiz({ type: 'PlayerJoined', payload: playerJoined });
      }
    },
    skip: !quiz.quizId,
  });

  usePlayerSubmittedAnswersSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const playerSubmittedAnswers =
        data?.subscriptionData?.data?.playerSubmittedAnswers;
      if (playerSubmittedAnswers) {
        updateQuiz({
          type: 'PlayerSubmittedAnswers',
          payload: playerSubmittedAnswers,
        });
      }
    },
    skip: !quiz.quizId,
  });

  usePlayerSubmittedMarksSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const playerSubmittedMarks =
        data?.subscriptionData?.data?.playerSubmittedMarks;
      if (playerSubmittedMarks) {
        updateQuiz({
          type: 'PlayerSubmittedMarks',
          payload: playerSubmittedMarks,
        });
      }
    },
    skip: !quiz.quizId,
  });
};
