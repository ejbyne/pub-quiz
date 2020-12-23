import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../../../web-app/src/shared/context/quizContext';

export const WaitingToStart: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  return (
    <View>
      <Text>You have joined the quiz: {quiz.quizName}</Text>
    </View>
  );
};
