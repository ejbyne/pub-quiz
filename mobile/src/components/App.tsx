import React, { useContext, useMemo } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Registration } from './Registration';
import { WaitingToStart } from './WaitingToStart';
import {
  useQuizSummaryQuery,
  useQuizStateSubscription,
  QuizStatus,
} from '../graphql/types';
import { QuizContext } from '../quizContext';
import { RoundStarted } from './RoundStarted';
import { QuestionAsked } from './QuestionAsked';
import { RoundFinished } from './RoundFinished';
import { QuizFinished } from './QuizFinished';

const getComponentFromStatus = (status?: QuizStatus): React.FC => {
  switch (status) {
    case QuizStatus.QuizNotYetStarted:
      return WaitingToStart;
    case QuizStatus.RoundStarted:
      return RoundStarted;
    case QuizStatus.QuestionAsked:
      return QuestionAsked;
    case QuizStatus.RoundFinished:
      return RoundFinished;
    case QuizStatus.QuizFinished:
      return QuizFinished;
    default:
      return Registration;
  }
};

export const App: React.FC = () => {
  const [quiz, updateQuiz] = useContext(QuizContext);

  const CurrentStep = getComponentFromStatus(quiz?.state?.status);

  useQuizSummaryQuery({
    variables: {
      quizId: quiz?.quizId as any,
    },
    onCompleted: (data) =>
      updateQuiz({ type: 'QuizSummaryReceived', payload: data?.quizSummary }),
    skip: !quiz.quizId,
  });

  useQuizStateSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const nextQuizState = data?.subscriptionData?.data?.nextQuizState;
      console.log('received subscription data', nextQuizState);
      if (nextQuizState) {
        updateQuiz({ type: 'NextQuizStateReceived', payload: nextQuizState });
      }
    },
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <CurrentStep />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
