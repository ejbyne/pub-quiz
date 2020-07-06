import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { QuizStatus, useJoinQuizMutation } from '../graphql/types';
import { QuizContext } from './App';

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  title: {
    alignItems: 'center',
    backgroundColor: 'blue',
    color: 'white',
    marginVertical: 30,
    fontSize: 24,
    fontWeight: '600',
  },
});

export const Registration: React.FC = () => {
  const [, updateQuiz] = useContext(QuizContext);
  const [playerName, setPlayerName] = useState<string>('');
  const [quizId, setQuizId] = useState<string>('');

  const [joinQuiz] = useJoinQuizMutation({
    variables: {
      input: {
        quizId,
        playerName,
      },
    },
  });

  return (
    <View>
      <Text style={styles.title}>Pub Quiz</Text>
      <TextInput
        value={playerName}
        placeholder="Name"
        onChangeText={(text) => setPlayerName(text)}
      />
      <TextInput
        value={quizId}
        placeholder="Quiz ID"
        onChangeText={(text) => setQuizId(text)}
      />
      <Button
        title="Join quiz"
        onPress={async () => {
          await joinQuiz();
          updateQuiz({ quizId });
        }}
      />
    </View>
  );
};
