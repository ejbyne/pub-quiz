import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type JoinQuizInput = {
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  saveQuiz: Scalars['Boolean'];
  joinQuiz: PlayerJoined;
  nextQuizState: QuizState;
};


export type MutationSaveQuizArgs = {
  input: SaveQuizInput;
};


export type MutationJoinQuizArgs = {
  input: JoinQuizInput;
};


export type MutationNextQuizStateArgs = {
  input: NextQuizStateInput;
};

export type NextQuizStateInput = {
  quizId: Scalars['ID'];
};

export type PlayerJoined = {
  __typename?: 'PlayerJoined';
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  quizSummary: QuizSummary;
};


export type QueryQuizSummaryArgs = {
  quizId: Scalars['ID'];
};

export type QuestionAsked = QuizState & {
  __typename?: 'QuestionAsked';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
  questionNumber: Scalars['Int'];
  questionText: Scalars['String'];
};

export type QuestionInput = {
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type QuizFinished = QuizState & {
  __typename?: 'QuizFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export type QuizNotYetStarted = QuizState & {
  __typename?: 'QuizNotYetStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export type QuizState = {
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export enum QuizStatus {
  QuizNotYetStarted = 'QUIZ_NOT_YET_STARTED',
  RoundStarted = 'ROUND_STARTED',
  QuestionAsked = 'QUESTION_ASKED',
  RoundFinished = 'ROUND_FINISHED',
  QuizFinished = 'QUIZ_FINISHED'
}

export type QuizSummary = {
  __typename?: 'QuizSummary';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
  playerNames?: Maybe<Array<Scalars['String']>>;
  state: QuizState;
};

export type RoundFinished = QuizState & {
  __typename?: 'RoundFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
};

export type RoundInput = {
  roundName: Scalars['String'];
  questions: Array<QuestionInput>;
};

export type RoundStarted = QuizState & {
  __typename?: 'RoundStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
};

export type RoundSummary = {
  __typename?: 'RoundSummary';
  roundNumber: Scalars['Int'];
  roundName: Scalars['String'];
  numberOfQuestions: Scalars['Int'];
};

export type SaveQuizInput = {
  quizName: Scalars['String'];
  rounds: Array<RoundInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  playerJoined?: Maybe<PlayerJoined>;
  nextQuizState?: Maybe<QuizState>;
};


export type SubscriptionPlayerJoinedArgs = {
  quizId: Scalars['ID'];
};


export type SubscriptionNextQuizStateArgs = {
  quizId: Scalars['ID'];
};

export type QuizSummaryQueryVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizSummaryQuery = (
  { __typename?: 'Query' }
  & { quizSummary: (
    { __typename?: 'QuizSummary' }
    & Pick<QuizSummary, 'quizId' | 'quizName' | 'playerNames'>
    & { state: (
      { __typename?: 'QuizNotYetStarted' }
      & Pick<QuizNotYetStarted, 'quizId' | 'status'>
    ) | (
      { __typename?: 'RoundStarted' }
      & Pick<RoundStarted, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'QuestionAsked' }
      & Pick<QuestionAsked, 'questionNumber' | 'questionText' | 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'RoundFinished' }
      & Pick<RoundFinished, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'QuizFinished' }
      & Pick<QuizFinished, 'quizId' | 'status'>
    ) }
  ) }
);

export type SaveQuizMutationVariables = Exact<{
  input: SaveQuizInput;
}>;


export type SaveQuizMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveQuiz'>
);

export type JoinQuizMutationVariables = Exact<{
  input: JoinQuizInput;
}>;


export type JoinQuizMutation = (
  { __typename?: 'Mutation' }
  & { joinQuiz: (
    { __typename?: 'PlayerJoined' }
    & Pick<PlayerJoined, 'quizId' | 'playerName'>
  ) }
);

export type NextQuizStateMutationVariables = Exact<{
  input: NextQuizStateInput;
}>;


export type NextQuizStateMutation = (
  { __typename?: 'Mutation' }
  & { nextQuizState: (
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'questionNumber' | 'questionText' | 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
  ) }
);

export type PlayerJoinedSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type PlayerJoinedSubscription = (
  { __typename?: 'Subscription' }
  & { playerJoined?: Maybe<(
    { __typename?: 'PlayerJoined' }
    & Pick<PlayerJoined, 'quizId' | 'playerName'>
  )> }
);

export type QuizStateSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizStateSubscription = (
  { __typename?: 'Subscription' }
  & { nextQuizState?: Maybe<(
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'questionNumber' | 'questionText' | 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
  )> }
);


export const QuizSummaryDocument = gql`
    query QuizSummary($quizId: ID!) {
  quizSummary(quizId: $quizId) {
    quizId
    quizName
    playerNames
    state {
      quizId
      status
      ... on RoundStarted {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
      }
      ... on QuestionAsked {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
        questionNumber
        questionText
      }
      ... on RoundFinished {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
      }
    }
  }
}
    `;

/**
 * __useQuizSummaryQuery__
 *
 * To run a query within a React component, call `useQuizSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizSummaryQuery({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useQuizSummaryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QuizSummaryQuery, QuizSummaryQueryVariables>) {
        return ApolloReactHooks.useQuery<QuizSummaryQuery, QuizSummaryQueryVariables>(QuizSummaryDocument, baseOptions);
      }
export function useQuizSummaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QuizSummaryQuery, QuizSummaryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QuizSummaryQuery, QuizSummaryQueryVariables>(QuizSummaryDocument, baseOptions);
        }
export type QuizSummaryQueryHookResult = ReturnType<typeof useQuizSummaryQuery>;
export type QuizSummaryLazyQueryHookResult = ReturnType<typeof useQuizSummaryLazyQuery>;
export type QuizSummaryQueryResult = ApolloReactCommon.QueryResult<QuizSummaryQuery, QuizSummaryQueryVariables>;
export const SaveQuizDocument = gql`
    mutation SaveQuiz($input: SaveQuizInput!) {
  saveQuiz(input: $input)
}
    `;
export type SaveQuizMutationFn = ApolloReactCommon.MutationFunction<SaveQuizMutation, SaveQuizMutationVariables>;

/**
 * __useSaveQuizMutation__
 *
 * To run a mutation, you first call `useSaveQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveQuizMutation, { data, loading, error }] = useSaveQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveQuizMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveQuizMutation, SaveQuizMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveQuizMutation, SaveQuizMutationVariables>(SaveQuizDocument, baseOptions);
      }
export type SaveQuizMutationHookResult = ReturnType<typeof useSaveQuizMutation>;
export type SaveQuizMutationResult = ApolloReactCommon.MutationResult<SaveQuizMutation>;
export type SaveQuizMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveQuizMutation, SaveQuizMutationVariables>;
export const JoinQuizDocument = gql`
    mutation JoinQuiz($input: JoinQuizInput!) {
  joinQuiz(input: $input) {
    quizId
    playerName
  }
}
    `;
export type JoinQuizMutationFn = ApolloReactCommon.MutationFunction<JoinQuizMutation, JoinQuizMutationVariables>;

/**
 * __useJoinQuizMutation__
 *
 * To run a mutation, you first call `useJoinQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinQuizMutation, { data, loading, error }] = useJoinQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinQuizMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinQuizMutation, JoinQuizMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinQuizMutation, JoinQuizMutationVariables>(JoinQuizDocument, baseOptions);
      }
export type JoinQuizMutationHookResult = ReturnType<typeof useJoinQuizMutation>;
export type JoinQuizMutationResult = ApolloReactCommon.MutationResult<JoinQuizMutation>;
export type JoinQuizMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinQuizMutation, JoinQuizMutationVariables>;
export const NextQuizStateDocument = gql`
    mutation NextQuizState($input: NextQuizStateInput!) {
  nextQuizState(input: $input) {
    quizId
    status
    ... on RoundStarted {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on QuestionAsked {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      questionNumber
      questionText
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
  }
}
    `;
export type NextQuizStateMutationFn = ApolloReactCommon.MutationFunction<NextQuizStateMutation, NextQuizStateMutationVariables>;

/**
 * __useNextQuizStateMutation__
 *
 * To run a mutation, you first call `useNextQuizStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNextQuizStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nextQuizStateMutation, { data, loading, error }] = useNextQuizStateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNextQuizStateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NextQuizStateMutation, NextQuizStateMutationVariables>) {
        return ApolloReactHooks.useMutation<NextQuizStateMutation, NextQuizStateMutationVariables>(NextQuizStateDocument, baseOptions);
      }
export type NextQuizStateMutationHookResult = ReturnType<typeof useNextQuizStateMutation>;
export type NextQuizStateMutationResult = ApolloReactCommon.MutationResult<NextQuizStateMutation>;
export type NextQuizStateMutationOptions = ApolloReactCommon.BaseMutationOptions<NextQuizStateMutation, NextQuizStateMutationVariables>;
export const PlayerJoinedDocument = gql`
    subscription PlayerJoined($quizId: ID!) {
  playerJoined(quizId: $quizId) {
    quizId
    playerName
  }
}
    `;

/**
 * __usePlayerJoinedSubscription__
 *
 * To run a query within a React component, call `usePlayerJoinedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlayerJoinedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerJoinedSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function usePlayerJoinedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>(PlayerJoinedDocument, baseOptions);
      }
export type PlayerJoinedSubscriptionHookResult = ReturnType<typeof usePlayerJoinedSubscription>;
export type PlayerJoinedSubscriptionResult = ApolloReactCommon.SubscriptionResult<PlayerJoinedSubscription>;
export const QuizStateDocument = gql`
    subscription QuizState($quizId: ID!) {
  nextQuizState(quizId: $quizId) {
    quizId
    status
    ... on RoundStarted {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on QuestionAsked {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      questionNumber
      questionText
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
  }
}
    `;

/**
 * __useQuizStateSubscription__
 *
 * To run a query within a React component, call `useQuizStateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useQuizStateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizStateSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useQuizStateSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<QuizStateSubscription, QuizStateSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<QuizStateSubscription, QuizStateSubscriptionVariables>(QuizStateDocument, baseOptions);
      }
export type QuizStateSubscriptionHookResult = ReturnType<typeof useQuizStateSubscription>;
export type QuizStateSubscriptionResult = ApolloReactCommon.SubscriptionResult<QuizStateSubscription>;