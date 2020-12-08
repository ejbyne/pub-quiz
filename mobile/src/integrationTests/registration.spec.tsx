import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { exampleQuiz } from './support/testFixtures';
import { createMockGraphQlClient } from './support/mockGraphQlClient';
import { TestAppContainer } from './support/TestAppContainer';
import { App } from '../components/App';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('registration', () => {
  it('allows a player to register for a quiz with the provided id', async () => {
    const mockQuizSummary = jest.fn().mockReturnValue(exampleQuiz);

    const mockJoinQuiz = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      playerName: 'Ed',
    });

    const client = createMockGraphQlClient({
      mockQueryResolvers: {
        quizSummary: mockQuizSummary,
      },
      mockMutationResolvers: {
        joinQuiz: mockJoinQuiz,
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

    expect(
      await findByText('You have joined the quiz: Random Quiz'),
    ).toBeTruthy();

    expect(mockJoinQuiz.mock.calls[0][1]).toEqual({
      input: {
        quizId: 'RANDOM_ID',
        playerName: 'Ed',
      },
    });

    expect(mockQuizSummary.mock.calls[0][1]).toEqual({
      quizId: 'RANDOM_ID',
    });
  });

  it('displays an error if the quiz cannot be joined', async () => {
    const mockJoinQuiz = jest
      .fn()
      .mockReturnValue(new Error('Player with name Ed already exists'));

    const client = createMockGraphQlClient({
      mockMutationResolvers: { joinQuiz: mockJoinQuiz },
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

    expect(mockJoinQuiz.mock.calls[0][1]).toEqual({
      input: {
        quizId: 'RANDOM_ID',
        playerName: 'Ed',
      },
    });
  });
});
