import React, { useReducer, Reducer, useState } from 'react';
import { Layout } from '../../Layout';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import {
  emptyQuiz,
  newQuizReducer,
} from '@pub-quiz/shared/src/domain/newQuizReducer';
import { ReactComponent as FastForward } from '../../../assets/icons/fast-forward.svg';
import { ReactComponent as Rewind } from '../../../assets/icons/rewind.svg';
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';
import { ReactComponent as PlusCircle } from '../../../assets/icons/plus-circle.svg';
import { SelectRound } from './SelectRound';
import { ModifySelectedRound } from './ModifySelectedRound';
import { ModifySelectedRoundQuestions } from './ModifySelectedRoundQuestions';
import { ModifyQuizName } from './ModifyQuizName';

export const NewQuiz = () => {
  const [newQuiz, updateNewQuiz] = useReducer<
    Reducer<SaveQuizInput, NewQuizAction>
  >(newQuizReducer, emptyQuiz);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const round = newQuiz.rounds[selectedRound];

  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Create your own quiz</h1>
        <form className="w-full flex flex-col">
          <ModifyQuizName newQuiz={newQuiz} updateNewQuiz={updateNewQuiz} />
          <div className="flex flex-col w-full items-center">
            <SelectRound
              newQuiz={newQuiz}
              updateNewQuiz={updateNewQuiz}
              selectedRound={selectedRound}
              setSelectedRound={setSelectedRound}
            />
            <ModifySelectedRound
              newQuiz={newQuiz}
              updateNewQuiz={updateNewQuiz}
              selectedRound={selectedRound}
              setSelectedRound={setSelectedRound}
            />
            <ModifySelectedRoundQuestions
              newQuiz={newQuiz}
              updateNewQuiz={updateNewQuiz}
              selectedRound={selectedRound}
              setSelectedRound={setSelectedRound}
            />
          </div>
        </form>
      </section>
    </Layout>
  );
};
