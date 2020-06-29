import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
} from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text style={styles.title}>Pub Quiz</Text>
            <TextInput placeholder="Name" />
            <TextInput placeholder="Quiz ID" />
            <Button
              title="Press me"
              onPress={() => Alert.alert('Button pressed')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  title: {
    alignItems: 'center',
    backgroundColor: 'blue',
    marginVertical: 30,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});

export default App;
