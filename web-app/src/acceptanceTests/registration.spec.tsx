import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactRouterDom from 'react-router-dom';
import { exampleQuizSummary } from '@pub-quiz/shared/src/testSupport/testFixtures';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { App } from '../components/App';

// const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('registration', () => {
  beforeEach(() => {
    window.localStorage.clear();
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({
      search: '',
    });
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

    render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    userEvent.type(screen.getByPlaceholderText('Name'), 'Ed');
    userEvent.type(screen.getByPlaceholderText('Quiz ID'), 'RANDOM_ID');
    userEvent.click(screen.getByText('Join quiz'));

    expect(await screen.findByText('Quiz: Random Quiz')).toBeTruthy();
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

    render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    userEvent.type(screen.getByPlaceholderText('Name'), 'Ed');
    userEvent.type(screen.getByPlaceholderText('Quiz ID'), 'RANDOM_ID');
    userEvent.click(screen.getByText('Join quiz'));

    expect(
      await screen.findByText('Player with name Ed already exists'),
    ).toBeTruthy();
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

    render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    userEvent.type(screen.getByPlaceholderText('Name'), 'Ed');
    userEvent.type(screen.getByPlaceholderText('Quiz ID'), 'RANDOM_ID');
    userEvent.click(screen.getByText('Join quiz'));

    expect(await screen.findByText('Quiz: Random Quiz')).toBeTruthy();
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

    render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    userEvent.type(screen.getByPlaceholderText('Name'), 'Ed');
    userEvent.type(screen.getByPlaceholderText('Quiz ID'), 'RANDOM_ID');
    userEvent.click(screen.getByText('Join quiz'));

    expect(await screen.findByText('Quiz: Random Quiz')).toBeTruthy();
    expect(mockJoinQuiz).not.toHaveBeenCalled();
  });

  it('adds the quiz id to the form if it is contained in the url', async () => {
    const client = createMockGraphQlClient();

    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({
      search: '?quizId=RANDOM_ID',
    });

    render(
      <TestAppContainer client={client}>
        <App />
      </TestAppContainer>,
    );

    expect(await screen.findByPlaceholderText('Quiz ID')).toHaveDisplayValue(
      'RANDOM_ID',
    );
  });
});
