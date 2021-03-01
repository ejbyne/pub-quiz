import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const quizIdParam = query.get('quizId');
    if (quizIdParam) {
      setQuizId(quizIdParam);
    }
  }, [location]);

  const onJoin = async () => {
    await joinQuiz();
    updateQuiz({ type: 'JoinedQuiz', payload: { quizId } });
    updateAnswerSheet({
      type: 'PlayerJoined',
      payload: { playerName },
    });
  };

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg overflow-y-auto">
      <h1 className="text-2xl font-medium text-center mb-4">Registration</h1>
      <p className="text-center mb-4">
        Please enter your name and the quiz ID provided by your host
      </p>
      <input
        className="text-input mb-4"
        value={playerName}
        placeholder="Name"
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
      <input
        className="text-input mb-4"
        value={quizId}
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.currentTarget.value)}
      />
      <button
        className="button"
        disabled={!playerName || !quizId || (joinQuizCalled && !joinQuizError)}
        onClick={onJoin}
      >
        {joinQuizCalled && !joinQuizError ? 'Loading...' : 'Join quiz'}
      </button>
      {joinQuizError ? (
        <p className="text-red-500 text-sm text-center mt-4">{joinQuizError}</p>
      ) : null}
    </section>
  );
};
