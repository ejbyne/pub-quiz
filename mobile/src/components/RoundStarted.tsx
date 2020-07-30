import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../quizContext';
import {
  RoundStarted as RoundStartedState,
} from '../graphql/types';

export const RoundStarted: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  console.log('in waiting to start component');

  const state = quiz.state as RoundStartedState;
  return (
    <View>
      <Text>Round {state.roundNumber + 1}</Text>
      <Text>{state.roundName}</Text>
      <Text>{state.numberOfQuestions} questions</Text>
    </View>
  );
};
