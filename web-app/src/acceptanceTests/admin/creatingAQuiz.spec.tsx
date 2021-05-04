import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import userEvent from '@testing-library/user-event';
import { Routes } from '../../components/Routes';

describe('creating a quiz', () => {
  it('enables the host to add questions for the first round', () => {
    render(
      <TestAppContainer client={createMockGraphQlClient()}>
        <MemoryRouter initialEntries={['/my-quizzes']}>
          <Routes />
        </MemoryRouter>
      </TestAppContainer>,
    );

    userEvent.click(screen.getByText('Create a quiz'));
    userEvent.type(screen.getByLabelText('Quiz name'), 'My first quiz');

    userEvent.type(screen.getByLabelText('Round name'), 'The first round');

    const question1 = within(
      screen.getByText('Question 1').parentElement!.parentElement!,
    );
    userEvent.type(
      question1.getByLabelText('Question 1'),
      'The first question',
    );
    userEvent.type(question1.getByLabelText('Answer'), 'The first answer');

    userEvent.click(screen.getByText('Add question'));

    const question2 = within(
      screen.getByText('Question 2').parentElement!.parentElement!,
    );
    userEvent.type(
      question2.getByLabelText('Question 2'),
      'The second question',
    );
    userEvent.type(question2.getByLabelText('Answer'), 'The second answer');
  });

  it('enables the host to add a round', () => {
    render(
      <TestAppContainer client={createMockGraphQlClient()}>
        <MemoryRouter initialEntries={['/my-quizzes']}>
          <Routes />
        </MemoryRouter>
      </TestAppContainer>,
    );

    userEvent.click(screen.getByText('Create a quiz'));

    userEvent.click(screen.getByText('Add round'));

    const round2 = within(
      screen.getByText('Round 2 of 2').parentElement!.parentElement!,
    );
    const question1 = within(
      round2.getByText('Question 1').parentElement!.parentElement!,
    );
    userEvent.type(
      question1.getByLabelText('Question 1'),
      'The first question',
    );
    userEvent.type(question1.getByLabelText('Answer'), 'The first answer');
  });

  it('enables to host to remove questions', () => {
    render(
      <TestAppContainer client={createMockGraphQlClient()}>
        <MemoryRouter initialEntries={['/my-quizzes']}>
          <Routes />
        </MemoryRouter>
      </TestAppContainer>,
    );

    userEvent.click(screen.getByText('Create a quiz'));
    userEvent.type(screen.getByLabelText('Quiz name'), 'My first quiz');

    userEvent.type(screen.getByLabelText('Round name'), 'The first round');

    const question1 = within(
      screen.getByText('Question 1').parentElement!.parentElement!,
    );
    userEvent.type(
      question1.getByLabelText('Question 1'),
      'The first question',
    );
    userEvent.type(question1.getByLabelText('Answer'), 'The first answer');

    userEvent.click(screen.getByText('Add question'));

    const question2 = within(
      screen.getByText('Question 2').parentElement!.parentElement!,
    );
    userEvent.type(
      question2.getByLabelText('Question 2'),
      'The second question',
    );
    userEvent.type(question2.getByLabelText('Answer'), 'The second answer');

    userEvent.click(question1.getByText('Remove question'));

    expect(
      screen.queryByDisplayValue('The first question'),
    ).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('The second question')).toBeInTheDocument();
  });

  it('enables the host to remove a round', () => {
    render(
      <TestAppContainer client={createMockGraphQlClient()}>
        <MemoryRouter initialEntries={['/my-quizzes']}>
          <Routes />
        </MemoryRouter>
      </TestAppContainer>,
    );

    userEvent.click(screen.getByText('Create a quiz'));
    userEvent.type(screen.getByLabelText('Round name'), 'The first round');
    userEvent.click(screen.getByText('Add round'));
    userEvent.type(screen.getByLabelText('Round name'), 'The second round');
    userEvent.click(screen.getByText('Previous round'));

    const round1 = within(
      screen.getByText('Round 1 of 2').parentElement!.parentElement!,
    );
    userEvent.click(round1.getByText('Remove round'));

    expect(
      screen.queryByDisplayValue('The first round'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Round 1 of 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('The second round')).toBeInTheDocument();
  });
});
