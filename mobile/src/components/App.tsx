import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { QuizContext } from '../../../web-app/src/shared/context/quizContext';
import { getComponentFromStatus } from './getComponentFromStatus';
import {
  useQuizSummaryQuery,
  useQuizStateSubscription,
} from '../../../web-app/src/shared/graphql/types';

export const App: React.FC = () => {
  const [quiz, updateQuiz] = useContext(QuizContext);

  const CurrentStep = getComponentFromStatus(quiz?.state?.status);

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
