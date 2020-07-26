import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { exampleQuiz } from './support/testFixtures';
import { createMockGraphQlClient } from './support/mockGraphQlClient';
import { TestAppContainer } from './support/TestAppContainer';
import { App } from '../components/App';

describe('registration', () => {
  it('allows a player to register for a quiz with the provided id', async () => {
    const quizSummary = jest.fn().mockReturnValue(exampleQuiz);

    const joinQuiz = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      playerName: 'Ed',
    });

    const client = createMockGraphQlClient({
      mockQueryResolvers: { quizSummary },
      mockMutationResolvers: {
        joinQuiz,
      },
    });

    const { getByPlaceholderText, getByText, findByText } = render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Ed');
    fireEvent.changeText(getByPlaceholderText('Quiz ID'), 'RANDOM_ID');
    fireEvent.press(getByText('Join quiz'));

    expect(joinQuiz.mock.calls[0][1]).toEqual({
      input: {
        quizId: 'RANDOM_ID',
        playerName: 'Ed',
      },
    });

    expect(
      await findByText('You have joined the quiz: Random Quiz'),
    ).toBeTruthy();
  });

  it('displays an error if the quiz cannot be joined', async () => {
    const joinQuiz = jest
      .fn()
      .mockReturnValue(new Error('Player with name Ed already exists'));

    const client = createMockGraphQlClient({
      mockMutationResolvers: { joinQuiz },
    });

    const { getByPlaceholderText, getByText, findByText } = render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Ed');
    fireEvent.changeText(getByPlaceholderText('Quiz ID'), 'RANDOM_ID');
    fireEvent.press(getByText('Join quiz'));

    expect(await findByText('Player with name Ed already exists')).toBeTruthy();
  });
});
