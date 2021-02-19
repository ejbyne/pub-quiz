import { answerSheetReducer } from '../answerSheetReducer';

describe('answer sheet reducer', () => {
  it('stores a player\'s name', () => {
    const answerSheet = { rounds: [] };

    const result = answerSheetReducer(answerSheet, {
      type: 'PlayerJoined',
      payload: {
        playerName: 'Ed',
      },
    });

    expect(result).toEqual({
      playerName: 'Ed',
      rounds: [],
    });
  });

  it('stores a player\'s answer for a round', () => {
    const answerSheet = { rounds: [] };

    const result = answerSheetReducer(answerSheet, {
      type: 'AnswerChanged',
      payload: {
        roundNumber: 0,
        questionNumber: 0,
        answer: 'My first answer',
      },
    });

    expect(result).toEqual({
      rounds: [
        [{ answer: 'My first answer' }],
      ],
    });
  });

  it('stores multiple player\'s answers for a round', () => {
    const answerSheet = { rounds: [] };

    const resultAfterFirstAnswer = answerSheetReducer(answerSheet, {
      type: 'AnswerChanged',
      payload: {
        roundNumber: 0,
        questionNumber: 0,
        answer: 'My first answer',
      },
    });

    const resultAfterSecondAnswer = answerSheetReducer(resultAfterFirstAnswer, {
      type: 'AnswerChanged',
      payload: {
        roundNumber: 0,
        questionNumber: 1,
        answer: 'My second answer',
      },
    });

    expect(resultAfterSecondAnswer).toEqual({
      rounds: [
        [{ answer: 'My first answer' }, { answer: 'My second answer' }],
      ],
    });
  });

  it('stores multiple player\'s answers for multiple rounds', () => {
    const answerSheet = { rounds: [] };

    const resultAfterFirstAnswer = answerSheetReducer(answerSheet, {
      type: 'AnswerChanged',
      payload: {
        roundNumber: 0,
        questionNumber: 0,
        answer: 'My first answer for round 1',
      },
    });

    const resultAfterSecondAnswer = answerSheetReducer(resultAfterFirstAnswer, {
      type: 'AnswerChanged',
      payload: {
        roundNumber: 1,
        questionNumber: 0,
        answer: 'My first answer for round 2',
      },
    });

    expect(resultAfterSecondAnswer).toEqual({
      rounds: [
        [{ answer: 'My first answer for round 1' }],
        [{ answer: 'My first answer for round 2' }],
      ],
    });
  });

  it('handles empty answers', () => {
    const answerSheet = { rounds: [] };

    const result = answerSheetReducer(answerSheet, {
      type: 'AnswerChanged',
      payload: {
        roundNumber: 1,
        questionNumber: 1,
        answer: 'My answer for the second question',
      },
    });

    expect(result).toEqual({ rounds: [undefined, [undefined, { answer: 'My answer for the second question' }]] });
  });
});
