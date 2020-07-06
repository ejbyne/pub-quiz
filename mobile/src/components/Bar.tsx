import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from './App';

export const Bar: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  console.log('quiz state in bar', JSON.stringify(quiz));

  return (
    <View>
      <Text>You have joined the quiz: {quiz.quizName}</Text>
    </View>
  );
};
