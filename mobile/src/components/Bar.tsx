import React from 'react';
import { View, Text } from 'react-native';

export const Bar: React.FC<{
  quizId: string;
  playerName: string;
}> = () => (
  <View>
    <Text>Please wait at the bar for the quiz to begin</Text>
  </View>
);
