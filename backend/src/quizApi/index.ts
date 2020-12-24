import fetch from 'node-fetch';
import { XmlEntities } from 'html-entities';
import { shuffle } from 'lodash';
import { Round } from '../domain/Quiz';

const entities = new XmlEntities();

interface ApiQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const quizCategoriesMap = {
  9: 'General Knowlege',
  10: 'Films',
  12: 'Music',
  13: 'Musicals and Theatre',
  14: 'Television',
  17: 'Science and Nature',
  21: 'Sports',
  22: 'Geography',
  23: 'History',
  27: 'Animals',
};

export const generateRounds = async (): Promise<Round[]> => {
  const rounds = await Promise.all(
    Object.entries(quizCategoriesMap).map(
      async ([categoryCode, categoryName]): Promise<Round> => {
        const apiResult = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${categoryCode}&difficulty=medium&type=multiple`
        ).then((result) => result.json());

        const round = {
          roundName: categoryName,
          questions: apiResult.results.map(
            ({ question, correct_answer, incorrect_answers }: ApiQuestion) => ({
              question: entities.decode(question) as string,
              answer: entities.decode(correct_answer) as string,
              options: shuffle([
                entities.decode(correct_answer),
                ...incorrect_answers.map(entities.decode),
              ]),
            })
          ),
        };

        console.log('round', JSON.stringify(round, null, 2));
        return round;
      }
    )
  );

  return shuffle(rounds);
};
