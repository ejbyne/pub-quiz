import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../quizContext';
import { QuizStatus, RoundStarted } from '../graphql/types';

export const Round: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  console.log('in waiting to start component');

  switch (quiz.state?.status) {
    case QuizStatus.RoundStarted:
      const state = quiz.state as RoundStarted;
      return (
        <View>
          <Text>You are in the round: {state.roundName}</Text>
        </View>
      );
    default:
      return null;
  }
};
