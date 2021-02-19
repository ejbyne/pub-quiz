import { NextQuizState } from '@pub-quiz/shared/src/domain/quizTypes';
import { receiveNextQuizState as genericReceiveNextQuizState } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { act } from '@testing-library/react';

export const receiveNextQuizState = (payload: NextQuizState) => {
    act(() => genericReceiveNextQuizState(payload));
};
