import React, { useContext, useState } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';
import { useJoinQuiz } from '../hooks/useJoinQuiz';

export const Registration: React.FC = () => {
  const [, updateQuiz] = useContext(QuizContext);
  const [, updateAnswerSheet] = useContext(AnswerSheetContext);
  const [playerName, setPlayerName] = useState<string>('');
  const [quizId, setQuizId] = useState<string>('');
  const [joinQuiz, joinQuizError, joinQuizCalled] = useJoinQuiz(
    quizId,
    playerName,
  );

  const onJoin = async () => {
    await joinQuiz();
    updateQuiz({ type: 'JoinedQuiz', payload: { quizId } });
    updateAnswerSheet({
      type: 'PlayerJoined',
      payload: { playerName },
    });
  };

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-2xl font-medium text-center mb-4">Registration</h1>
      <p className="text-center mb-4">
        Please enter your name and the quiz ID provided by your host
      </p>
      <input
        className="text-input"
        value={playerName}
        placeholder="Name"
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
      <input
        className="text-input"
        value={quizId}
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.currentTarget.value)}
      />
      <button
        className="button"
        disabled={!playerName || !quizId || (joinQuizCalled && !joinQuizError)}
        onClick={onJoin}
      >
        Join quiz
      </button>
      {joinQuizError ? (
        <p className="text-red-500 text-sm text-center">{joinQuizError}</p>
      ) : null}
    </section>
  );
};
