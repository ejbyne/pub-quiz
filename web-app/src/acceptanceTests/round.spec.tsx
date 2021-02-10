import React from 'react';
import {App} from '../components/App';
import {render} from '@testing-library/react';
import {
    exampleQuestionAnsweredState,
    exampleQuestionAskedState,
    exampleQuizSummary, exampleRoundFinishedState,
    exampleRoundStartedState
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import {createMockGraphQlClient} from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import {TestAppContainer} from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import {QuizStatus} from '@pub-quiz/shared/src/graphql/types';
import {receiveNextQuizState} from '../testSupport/receiveNextQuizState';

describe('round', () => {
    it('starts the first round', async () => {
        const initialQuizState = {
            ...exampleQuizSummary,
            rounds: [],
        };

        const {findByText} = render(
            <TestAppContainer
                client={createMockGraphQlClient()}
                initialState={initialQuizState}>
                <App/>
            </TestAppContainer>,
        );

        receiveNextQuizState(exampleRoundStartedState);

        expect(await findByText('Round 1')).toBeTruthy();
        expect(await findByText('The first round')).toBeTruthy();
    });

    it('asks the first question', async () => {
        const initialQuizState = {
            ...exampleQuizSummary,
            state: exampleRoundStartedState,
            rounds: [
                {
                    roundNumber: 0,
                    roundName: 'The first round',
                    numberOfQuestions: 10,
                    questions: [],
                },
            ],
        };

        const {findByText} = render(
            <TestAppContainer
                client={createMockGraphQlClient()}
                initialState={initialQuizState}>
                <App/>
            </TestAppContainer>,
        );

        receiveNextQuizState(exampleQuestionAskedState);

        expect(await findByText('Question 1')).toBeTruthy();
        expect(await findByText('The first question')).toBeTruthy();
    });

    it('asks the second question', async () => {
        const initialQuizState = {
            ...exampleQuizSummary,
            state: exampleQuestionAskedState,
            rounds: [
                {
                    roundNumber: 0,
                    roundName: 'The first round',
                    numberOfQuestions: 10,
                    questions: [
                        {
                            number: 0,
                            text: 'The first question',
                        },
                    ],
                },
            ],
        };

        const {findByText} = render(
            <TestAppContainer
                client={createMockGraphQlClient()}
                initialState={initialQuizState}>
                <App/>
            </TestAppContainer>,
        );

        receiveNextQuizState({
            ...exampleQuestionAskedState,
            question: {
                number: 1,
                text: 'The second question',
            }
        });

        expect(await findByText('Question 1')).toBeTruthy();
        expect(await findByText('The first question')).toBeTruthy();

        expect(await findByText('Question 2')).toBeTruthy();
        expect(await findByText('The second question')).toBeTruthy();
    });

    it('finishes a round', async () => {
        const initialQuizState = {
            ...exampleQuizSummary,
            state: {
                ...exampleQuestionAskedState,
                question: {
                    number: 1,
                    text: 'The last question',
                }
            },
            rounds: [
                {
                    roundNumber: 0,
                    roundName: 'The first round',
                    numberOfQuestions: 2,
                    questions: [
                        {number: 0, text: 'The first question'},
                        {number: 1, text: 'The last question'},
                    ],
                },
            ],
        };

        const {findByText} = render(
            <TestAppContainer
                client={createMockGraphQlClient()}
                initialState={initialQuizState}>
                <App/>
            </TestAppContainer>,
        );

        receiveNextQuizState(exampleRoundFinishedState);

        expect(await findByText('Round 1 completed')).toBeTruthy();
    });

    it('shows the question answers', async () => {
        const initialQuizState = {
            ...exampleQuizSummary,
            state: exampleRoundFinishedState,
            rounds: [
                {
                    roundNumber: 0,
                    roundName: 'The first round',
                    numberOfQuestions: 10,
                    questions: [
                        {number: 0, text: 'The first question'},
                        {number: 1, text: 'The last question'},
                    ],
                },
            ],
        };

        const {findByText} = render(
            <TestAppContainer
                client={createMockGraphQlClient()}
                initialState={initialQuizState}>
                <App/>
            </TestAppContainer>,
        );

        receiveNextQuizState(exampleQuestionAnsweredState);

        expect(await findByText('Question 1')).toBeTruthy();
        expect(await findByText('The first question')).toBeTruthy();
        expect(await findByText('Answer: The first answer')).toBeTruthy();
    });

    it('finishes the quiz', async () => {
        const initialQuizState = {
            ...exampleQuizSummary,
            state: {
                ...exampleQuestionAnsweredState,
                question: {
                    number: 1,
                    text: 'The second question',
                    answer: 'The second answer',
                }
            },
            rounds: [
                {
                    roundNumber: 0,
                    roundName: 'The first round',
                    numberOfQuestions: 2,
                    questions: [
                        {number: 0, text: 'The first question'},
                        {number: 1, text: 'The last question'},
                    ],
                },
            ],
        };

        const {findByText} = render(
            <TestAppContainer
                client={createMockGraphQlClient()}
                initialState={initialQuizState}>
                <App/>
            </TestAppContainer>,
        );

        receiveNextQuizState({
            __typename: 'QuizFinished',
            quizId: 'RANDOM_ID',
            status: QuizStatus.QuizFinished,
        });

        expect(await findByText('Quiz complete')).toBeTruthy();
    });
});
