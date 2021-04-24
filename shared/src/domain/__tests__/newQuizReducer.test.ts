import { newQuizReducer } from '../newQuizReducer';

describe('newQuizReducer', () => {
  describe('quiz name', () => {
    it('amends the quiz name', () => {
      const result = newQuizReducer(undefined, {
        type: 'QuizNameAmended',
        payload: {
          quizName: 'My quiz',
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: '',
            questions: [
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      });
    });
  });

  describe('rounds', () => {
    it('amends the round name', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: '',
            questions: [
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'RoundNameAmended',
        payload: {
          roundNumber: 0,
          roundName: 'The first round',
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      });
    });

    it('adds another round', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'RoundAdded',
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
          {
            roundName: '',
            questions: [
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      });
    });

    it('removes a round', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
          {
            roundName: '',
            questions: [],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'RoundRemoved',
        payload: {
          roundNumber: 1,
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
        ],
      });
    });
  });

  describe('questions', () => {
    it('amends the first question', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'QuestionAmended',
        payload: {
          roundNumber: 0,
          questionNumber: 0,
          text: 'The first question',
          answer: 'The first answer',
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
        ],
      });
    });

    it('adds another question', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'QuestionAdded',
        payload: {
          roundNumber: 0,
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      });
    });

    it('removes a question', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
              {
                text: 'The second question',
                answer: 'The second answer',
              },
              {
                text: 'The third question',
                answer: 'The third answer',
              },
            ],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'QuestionRemoved',
        payload: {
          roundNumber: 0,
          questionNumber: 1,
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
              {
                text: 'The third question',
                answer: 'The third answer',
              },
            ],
          },
        ],
      });
    });

    it('amends another question', () => {
      const initialState = {
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
            ],
          },
        ],
      };

      const result = newQuizReducer(initialState, {
        type: 'QuestionAmended',
        payload: {
          roundNumber: 0,
          questionNumber: 1,
          text: 'The second question',
          answer: 'The second answer',
        },
      });

      expect(result).toEqual({
        quizName: 'My quiz',
        rounds: [
          {
            roundName: 'The first round',
            questions: [
              {
                text: 'The first question',
                answer: 'The first answer',
              },
              {
                text: 'The second question',
                answer: 'The second answer',
              },
            ],
          },
        ],
      });
    });
  });
});
