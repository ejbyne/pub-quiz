import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../quizContext';

export const WaitingToStart: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  console.log('in waiting to start component');

  return (
    <View>
      <Text>You have joined the quiz: {quiz.quizName}</Text>
    </View>
  );
};
