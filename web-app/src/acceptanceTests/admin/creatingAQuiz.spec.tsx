import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import userEvent from '@testing-library/user-event';
import { Routes } from '../../components/Routes';

describe('creating a quiz', () => {
  it('enables the host to create a quiz', () => {
    render(
      <TestAppContainer client={createMockGraphQlClient()}>
        <MemoryRouter initialEntries={['/my-quizzes']}>
          <Routes />
        </MemoryRouter>
      </TestAppContainer>,
    );

    userEvent.click(screen.getByText('Create a quiz'));
    userEvent.type(screen.getByPlaceholderText('Quiz name'), 'My first quiz');
    // userEvent.type(screen.getByPlaceholderText('Round 1'), 'The first round');
  });
});
