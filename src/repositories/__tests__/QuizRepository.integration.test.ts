import { provisionDatabase, createTable } from './databaseSetup';
import { QuizRepository } from '../QuizRepository';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import {
  QuizStatus,
  QuizNotYetStartedState,
  QuestionAskedState,
} from '../../domain/types';
import { Quiz } from '../../domain/Quiz';

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
  new QuizNotYetStartedState(exampleRounds)
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
  });

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
    ).rejects.toEqual(new Error('Player name already exists'));
  });

  it('updates the quiz state', async () => {
    await quizRepository.save(exampleQuiz);

    await quizRepository.updateState(
      EXAMPLE_QUIZ_ID,
      new QuestionAskedState(exampleRounds, 1, 1, 'A question?')
    );

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.state).toMatchObject({
      status: QuizStatus.QUESTION_ASKED,
      roundNumber: 1,
      questionNumber: 1,
      questionText: 'A question?',
    });
  });
});
