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
import { Round } from './Round';

const getComponentFromStatus = (status?: QuizStatus): React.FC => {
  switch (status) {
    case QuizStatus.QuizNotYetStarted:
      return WaitingToStart;
    case QuizStatus.RoundStarted:
      return Round;
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
    onCompleted: (data) => updateQuiz({ ...data?.quizSummary }),
    skip: !quiz.quizId,
  });

  const { data } = useQuizStateSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const state = data?.subscriptionData?.data?.nextQuizState;
      console.log('received subscription data', state);
      if (state) {
        updateQuiz({ state });
      }
    },
  });

  console.log('subscription data', data);

  console.log('quiz', quiz);

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
