import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { exampleQuizSummary } from '@pub-quiz/shared/src/testSupport/testFixtures';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { App } from '../components/App';

describe('registration', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('allows a player to register for a quiz with the provided id', async () => {
    const mockQuizSummary = jest.fn().mockReturnValue(exampleQuizSummary);

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

    fireEvent.change(getByPlaceholderText('Name'), {
      target: { value: 'Ed' },
    });
    fireEvent.change(getByPlaceholderText('Quiz ID'), {
      target: { value: 'RANDOM_ID' },
    });
    fireEvent.click(getByText('Join quiz'));

    expect(await findByText('Quiz: Random Quiz')).toBeTruthy();

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

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Ed' } });
    fireEvent.change(getByPlaceholderText('Quiz ID'), {
      target: { value: 'RANDOM_ID' },
    });
    fireEvent.click(getByText('Join quiz'));

    expect(await findByText('Player with name Ed already exists')).toBeTruthy();

    expect(mockJoinQuiz.mock.calls[0][1]).toEqual({
      input: {
        quizId: 'RANDOM_ID',
        playerName: 'Ed',
      },
    });
  });

  it('remembers the quiz in case the player needs to rejoin', async () => {
    const mockQuizSummary = jest.fn().mockReturnValue(exampleQuizSummary);

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

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Ed' } });
    fireEvent.change(getByPlaceholderText('Quiz ID'), {
      target: { value: 'RANDOM_ID' },
    });
    fireEvent.click(getByText('Join quiz'));

    expect(await findByText('Quiz: Random Quiz')).toBeTruthy();

    expect(window.localStorage.getItem('quizHistory')).toEqual(
      JSON.stringify([{ quizId: 'RANDOM_ID', playerName: 'Ed' }]),
    );
  });

  it('remembers if the player has previously joined', async () => {
    window.localStorage.setItem(
      'quizHistory',
      JSON.stringify([{ quizId: 'RANDOM_ID', playerName: 'Ed' }]),
    );

    const mockQuizSummary = jest.fn().mockReturnValue(exampleQuizSummary);

    const mockJoinQuiz = jest.fn();

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

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Ed' } });
    fireEvent.change(getByPlaceholderText('Quiz ID'), {
      target: { value: 'RANDOM_ID' },
    });
    fireEvent.click(getByText('Join quiz'));

    expect(await findByText('Quiz: Random Quiz')).toBeTruthy();

    expect(mockJoinQuiz).not.toHaveBeenCalled();
  });
});
