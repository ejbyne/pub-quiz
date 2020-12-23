import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { QuizContext } from '../../../shared/context/quizContext';
import { QuestionAsked as QuestionAskedState } from '../../../shared/graphql/types';
import { Question } from '../../../shared/domain/types';

export const QuestionAsked: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as QuestionAskedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <View>
      <Text>Round {round.roundNumber + 1}</Text>
      <Text>{round.roundName}</Text>
      {round.questions.map((question: Question) => (
        <View key={question.questionNumber}>
          <Text>Question {question.questionNumber + 1}</Text>
          <Text>{question.questionText}</Text>
          <TextInput placeholder="Your answer" />
        </View>
      ))}
    </View>
  );
};
