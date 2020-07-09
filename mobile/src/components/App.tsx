import React, { useReducer, Reducer, createContext, Dispatch } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Registration } from './Registration';
import { quizReducer, Quiz } from '../domain/quizReducer';
import { Bar } from './Bar';
import { useQuizSummaryQuery } from '../graphql/types';

export const QuizContext = createContext<
  [Partial<Quiz>, Dispatch<Partial<Quiz>>]
>(undefined as any);

export const App: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Partial<Quiz>, Partial<Quiz>>>(
    quizReducer,
    {},
  );

  const CurrentStep = quiz?.state ? Bar : Registration;

  const { data, error } = useQuizSummaryQuery({
    variables: {
      quizId: quiz?.quizId as any,
    },
    onCompleted: (data) => updateQuiz({ ...data?.quizSummary }),
    skip: !quiz.quizId,
  });

  console.log('quiz in store', quiz);
  console.log('quiz summary', JSON.stringify(data));
  console.log('quiz summary error', JSON.stringify(error));

  // const {
  //   data: subscriptionData,
  //   error: subscriptionError,
  // } = useQuizStateSubscription({
  //   variables: { quizId: quizState?.quizId as string },
  //   skip: !data,
  //   onSubscriptionData: (data) =>
  //     data?.subscriptionData.data?.nextQuizState &&
  //     dispatch(data.subscriptionData.data?.nextQuizState),
  // });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <QuizContext.Provider value={[quiz, updateQuiz]}>
            <CurrentStep />
          </QuizContext.Provider>
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
