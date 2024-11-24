import {
  ApolloCache,
  BaseMutationOptions,
  DefaultContext,
  OperationVariables,
} from '@apollo/client';

export type clientOptionType =
  | BaseMutationOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<any>
    >
  | undefined;
