import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { render, screen, within } from '@testing-library/react';
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
    userEvent.type(screen.getByLabelText('Quiz name'), 'My first quiz');

    userEvent.type(screen.getByLabelText('Round 1'), 'The first round');

    const question1 = within(screen.getByText('Question 1').parentElement!);
    userEvent.type(question1.getByLabelText('Question'), 'The first question');
    userEvent.type(question1.getByLabelText('Answer'), 'The first answer');

    userEvent.click(screen.getByText('Add question'));

    const question2 = within(screen.getByText('Question 2').parentElement!);
    userEvent.type(question2.getByLabelText('Question'), 'The second question');
    userEvent.type(question2.getByLabelText('Answer'), 'The second answer');
  });
});
