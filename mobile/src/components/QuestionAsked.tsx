import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { QuestionAsked as QuestionAskedState } from '@pub-quiz/shared/src/graphql/types';
import { Question } from '@pub-quiz/shared/src/domain/types';

export const QuestionAsked: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as QuestionAskedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <View>
      <Text>Round {round.roundNumber + 1}</Text>
      <Text>{round.roundName}</Text>
      {round.questions.map((question: Question) => (
        <View key={question.number}>
          <Text>Question {question.number + 1}</Text>
          <Text>{question.text}</Text>
          <TextInput placeholder="Your answer" />
        </View>
      ))}
    </View>
  );
};
