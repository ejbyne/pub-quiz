import {QuestionAnswered, QuestionAsked, QuizStatus, QuizSummary, RoundFinished, RoundStarted} from '../graphql/types';

export const exampleQuizSummary: QuizSummary = {
    __typename: 'QuizSummary',
    quizId: 'RANDOM_ID',
    quizName: 'Random Quiz',
    playerNames: null,
    state: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.QuizNotYetStarted,
    },
};

export const exampleRoundStartedState: RoundStarted = {
    __typename: 'RoundStarted',
    quizId: 'RANDOM_ID',
    status: QuizStatus.RoundStarted,
    roundSummary: {
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 10,
    },
};

export const exampleQuestionAskedState: QuestionAsked = {
    __typename: 'QuestionAsked',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuestionAsked,
    roundSummary: {
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 10,
    },
    question: {
        number: 0,
        text: 'The first question'
    }
};

export const exampleRoundFinishedState: RoundFinished = {
    __typename: 'RoundFinished',
    quizId: 'RANDOM_ID',
    status: QuizStatus.RoundFinished,
    roundSummary: {
        roundNumber: 0,
        roundName: 'Round 1',
        numberOfQuestions: 10,
    },
};

export const exampleQuestionAnsweredState: QuestionAnswered = {
    __typename: 'QuestionAnswered',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuestionAnswered,
    roundSummary: {
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 10,
    },
    question: {
        number: 0,
        text: 'The first question',
        answer: 'The first answer',
    }
};
