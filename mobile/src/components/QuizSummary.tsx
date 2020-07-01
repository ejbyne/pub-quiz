import React from 'react';
import {
  usePlayerJoinedSubscription,
  useQuizSummaryQuery,
} from '../graphql/types';
import { View, Text } from 'react-native';

export const QuizSummary: React.FC = () => {
  const { data, error } = useQuizSummaryQuery({
    variables: {
      quizId: '14293ee3-63b0-442a-858f-8484f5175976',
    },
  });

  const {
    data: subscriptionData,
    error: subscriptionError,
  } = usePlayerJoinedSubscription({
    variables: { quizId: '14293ee3-63b0-442a-858f-8484f5175976' },
  });

  return (
    <View>
      <Text>{JSON.stringify(data ?? error)}</Text>
      <Text>
        {JSON.stringify(
          subscriptionData ?? subscriptionError ?? 'No subscription result',
        )}
      </Text>
    </View>
  );
};
