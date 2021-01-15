import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { RoundFinished as RoundFinishedState } from '@pub-quiz/shared/src/graphql/types';

export const RoundFinished: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundFinishedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <View>
      <Text>Round {round.roundNumber + 1} complete</Text>
    </View>
  );
};
