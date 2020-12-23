import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '../../../shared/context/quizContext';
import { RoundStarted as RoundStartedState } from '../../../shared/graphql/types';

export const RoundStarted: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundStartedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <View>
      <Text>Round {round.roundNumber + 1}</Text>
      <Text>{round.roundName}</Text>
      <Text>{round.numberOfQuestions} questions</Text>
    </View>
  );
};
