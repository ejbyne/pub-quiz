import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../quizContext';
import {
  QuestionAsked as QuestionAskedState,
} from '../graphql/types';

export const QuestionAsked: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  const state = quiz.state as QuestionAskedState;

  return (
    <View>
      <Text>Question {state.questionNumber + 1}</Text>
      <Text>{state.questionText}</Text>
    </View>
  );
};
