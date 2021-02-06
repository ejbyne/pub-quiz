import { provisionDatabase, createTable } from './databaseSetup';
import { QuizRepository } from '../QuizRepository';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

import { Quiz } from '../../domain/Quiz';
import { QuizNotYetStarted } from '../../domain/state/QuizNotYetStarted';
import { QuestionAsked } from '../../domain/state/QuestionAsked';
import { QuizStatus } from '../../domain/types';

const EXAMPLE_QUIZ_ID = 'NEW_QUIZ_ID';

const exampleRounds = [
  {
    roundName: 'Round 1',
    questions: [
      {
        question: 'A question',
        answer: 'An answer',
      },
    ],
  },
];

const exampleQuiz: Quiz = new Quiz(
  EXAMPLE_QUIZ_ID,
  "Ed's quiz",
  exampleRounds,
  new QuizNotYetStarted(exampleRounds)
);

describe('QuizRepository integration tests', () => {
  let databaseManager: {
    dynamoClientConfiguration: ServiceConfigurationOptions;
    tearDownDatabase: () => Promise<any>;
  };
  let quizRepository: QuizRepository;
  const tableName = 'QuizTable';

  beforeAll(async () => {
    databaseManager = await provisionDatabase();
    await createTable(
      'QuizTable',
      'quizId',
      databaseManager.dynamoClientConfiguration
    );
    quizRepository = new QuizRepository(
      tableName,
      databaseManager.dynamoClientConfiguration
    );
  }, 30000);

  afterAll(async () => await databaseManager.tearDownDatabase());

  it('saves a quiz', async () => {
    await quizRepository.save(exampleQuiz);

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz).toEqual(exampleQuiz);
  });

  it('adds the first player name', async () => {
    await quizRepository.save(exampleQuiz);

    await quizRepository.addPlayerName(EXAMPLE_QUIZ_ID, 'Ed');

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.playerNames?.values).toEqual(['Ed']);
  });

  it('adds additional player names', async () => {
    await quizRepository.save(exampleQuiz);

    await quizRepository.addPlayerName(EXAMPLE_QUIZ_ID, 'Ed');
    await quizRepository.addPlayerName(EXAMPLE_QUIZ_ID, 'Henry');

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.playerNames?.values).toEqual(['Ed', 'Henry']);
  });

  it('throws an error if the player name already exists', async () => {
    await quizRepository.save(exampleQuiz);

    await quizRepository.addPlayerName(EXAMPLE_QUIZ_ID, 'Ed');

    await expect(
      quizRepository.addPlayerName(EXAMPLE_QUIZ_ID, 'Ed')
    ).rejects.toEqual(new Error('A player with the name Ed already exists'));
  });

  it('throws an error if the quiz ID does not exist', async () => {
    await expect(
      quizRepository.addPlayerName('UNKNOWN_QUIZ_ID', 'Ed')
    ).rejects.toEqual(new Error('The quiz ID does not exist'));
  });

  it('updates the quiz state', async () => {
    await quizRepository.save(exampleQuiz);

    await quizRepository.updateState(
      EXAMPLE_QUIZ_ID,
      new QuestionAsked(exampleRounds, 0, 0)
    );

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.state).toMatchObject({
      status: QuizStatus.QUESTION_ASKED,
      roundNumber: 0,
      questionNumber: 0,
    });
  });
});
