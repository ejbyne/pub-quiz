import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { Routes } from '../../components/Routes';
import { MemoryRouter } from 'react-router';

describe('seeing own quizzes', () => {
  it("displays the host's quizzes", async () => {
    render(
      <TestAppContainer
        client={createMockGraphQlClient({
          mockQueryResolvers: {
            quizzes: jest.fn().mockReturnValue([
              {
                quizId: 'RANDOM_ID_1',
                quizName: 'First quiz',
                rounds: [],
              },
              {
                quizId: 'RANDOM_ID_2',
                quizName: 'Second quiz',
                rounds: [],
              },
            ]),
          },
        })}
      >
        <MemoryRouter initialEntries={['/my-quizzes']}>
          <Routes />
        </MemoryRouter>
      </TestAppContainer>,
    );

    expect(await screen.findByText('First quiz')).toBeInTheDocument();
    expect(await screen.findByText('Second quiz')).toBeInTheDocument();
  });
});
