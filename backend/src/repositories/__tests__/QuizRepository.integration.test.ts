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
        text: 'A question',
        answer: 'An answer',
      },
    ],
  },
];

const exampleQuiz: Quiz = new Quiz(
  EXAMPLE_QUIZ_ID,
  "Ed's quiz",
  exampleRounds,
  new QuizNotYetStarted(exampleRounds, {})
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

  it('throws an error if the quiz ID does not exist', async () => {
    await expect(
      quizRepository.addPlayerName('UNKNOWN_QUIZ_ID', 'Ed')
    ).rejects.toEqual(new Error('The quiz ID does not exist'));
  });

  it('updates the quiz state', async () => {
    await quizRepository.save(exampleQuiz);

    await quizRepository.updateState(
      EXAMPLE_QUIZ_ID,
      new QuestionAsked(exampleRounds, {}, 0, 0)
    );

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.state).toMatchObject({
      status: QuizStatus.QUESTION_ASKED,
      roundNumber: 0,
      questionNumber: 0,
    });
  });

  it("saves players' answers for a round", async () => {
    await quizRepository.save(
      new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAsked(exampleRounds, {}, 0, 0)
      )
    );

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed',
      answers: ["Ed's answer"],
    });

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Henry',
      answers: ["Henry's answer"],
    });

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.answers).toEqual({
      Ed: [[{ answer: "Ed's answer" }]],
      Henry: [[{ answer: "Henry's answer" }]],
    });
  });

  it('handles saving answers where not all rounds are provided', async () => {
    await quizRepository.save(
      new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAsked(exampleRounds, {}, 0, 0)
      )
    );

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed',
      answers: ["Ed's 1st answer round 1"],
    });

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 2,
      playerName: 'Ed',
      answers: ["Ed's 1st answer round 3"],
    });

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.answers).toEqual({
      Ed: [
        [{ answer: "Ed's 1st answer round 1" }],
        [],
        [{ answer: "Ed's 1st answer round 3" }],
      ],
    });
  });

  it('handles saving answers for a player with a special character in their name', async () => {
    await quizRepository.save(
      new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAsked(exampleRounds, {}, 0, 0)
      )
    );

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed & Henry',
      answers: ["Ed and Henry's 1st answer round 1"],
    });

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.answers).toEqual({
      'Ed & Henry': [[{ answer: "Ed and Henry's 1st answer round 1" }]],
    });
  });

  it("saves players' marks for a round", async () => {
    await quizRepository.save(
      new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAsked(exampleRounds, {}, 0, 0)
      )
    );

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed',
      answers: ["Ed's answer"],
    });

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Henry',
      answers: ["Henry's answer"],
    });

    await quizRepository.saveMarks({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed',
      marks: [0],
    });

    await quizRepository.saveMarks({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Henry',
      marks: [1],
    });

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.answers).toEqual({
      Ed: [[{ answer: "Ed's answer", mark: 0 }]],
      Henry: [[{ answer: "Henry's answer", mark: 1 }]],
    });
  });

  it("handles saving a player's marks where not all rounds are provided", async () => {
    await quizRepository.save(
      new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAsked(exampleRounds, {}, 0, 0)
      )
    );

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 2,
      playerName: 'Ed',
      answers: ["Ed's 1st answer round 3"],
    });

    await quizRepository.saveMarks({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed',
      marks: [1],
    });

    await quizRepository.saveMarks({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 2,
      playerName: 'Ed',
      marks: [1],
    });

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.answers).toEqual({
      Ed: [[], [], [{ answer: "Ed's 1st answer round 3", mark: 1 }]],
    });
  });

  it('handles saving marks for a player with a special character in their name', async () => {
    await quizRepository.save(
      new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAsked(exampleRounds, {}, 0, 0)
      )
    );

    await quizRepository.saveAnswers({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed & Henry',
      answers: ["Ed and Henry's 1st answer round 1"],
    });

    await quizRepository.saveMarks({
      quizId: EXAMPLE_QUIZ_ID,
      roundNumber: 0,
      playerName: 'Ed & Henry',
      marks: [1],
    });

    const savedQuiz = await quizRepository.get(EXAMPLE_QUIZ_ID);
    expect(savedQuiz.answers).toEqual({
      'Ed & Henry': [
        [{ answer: "Ed and Henry's 1st answer round 1", mark: 1 }],
      ],
    });
  });
});
