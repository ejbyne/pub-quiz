import { provisionDatabase, createTable } from './databaseSetup';
import { QuizRepository } from '../QuizRepository';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { Quiz, QuizStatus } from '../../domain/types';

describe('QuizRepository integration tests', () => {
  let dynamoClientConfiguration: ServiceConfigurationOptions;
  let tearDownDatabase: () => Promise<any>;
  let quizRepository: QuizRepository;
  const tableName = 'QuizTable';

  beforeAll(async () => {
    const databaseHelper = await provisionDatabase();

    dynamoClientConfiguration = databaseHelper.dynamoClientConfiguration;
    tearDownDatabase = databaseHelper.tearDownDatabase;

    await createTable('QuizTable', 'quizId', dynamoClientConfiguration);

    quizRepository = new QuizRepository(tableName, dynamoClientConfiguration);
  });

  afterAll(async () => await tearDownDatabase());

  it('saves a quiz', async () => {
    const newQuiz: Quiz = {
      quizId: '1234',
      quizName: "Ed's quiz",
      rounds: [
        {
          roundName: 'Round 1',
          questions: [
            {
              question: 'A question',
              answer: 'An answer',
            },
          ],
        },
      ],
      playerNames: [],
      status: QuizStatus.NOT_YET_STARTED,
      progress: null,
    };

    await quizRepository.save(newQuiz);
  });
});
