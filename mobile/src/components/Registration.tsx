import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

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

export const Registration: React.FC = () => (
  <View>
    <Text style={styles.title}>Pub Quiz</Text>
    <TextInput placeholder="Name" />
    <TextInput placeholder="Quiz ID" />
    <Button title="Join quiz" onPress={() => Alert.alert('Button pressed')} />
  </View>
);
