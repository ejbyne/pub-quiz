import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../quizContext';
import {
  RoundFinished as RoundFinishedState,
} from '../graphql/types';

export const RoundFinished: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  const state = quiz.state as RoundFinishedState;

  return (
    <View>
      <Text>Round {state.roundNumber + 1} complete</Text>
    </View>
  );
};
