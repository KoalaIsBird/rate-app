/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation SignIn($username: String!, $password: String!){\n    authenticate(credentials:{username: $username, password: $password}) {\n      accessToken\n    }\n  }\n": typeof types.SignInDocument,
    "\n\n  query GetRepositories{\n    repositories {\n      edges {\n        node {\n          description\n          forksCount\n          fullName\n          language\n          ownerAvatarUrl\n          stargazersCount\n          reviewCount\n          ratingAverage\n          id\n        }\n      }\n    }\n  }\n\n": typeof types.GetRepositoriesDocument,
    "\n  query GetMe{\n    me {\n      id\n      username\n    }\n  }\n": typeof types.GetMeDocument,
};
const documents: Documents = {
    "\n  mutation SignIn($username: String!, $password: String!){\n    authenticate(credentials:{username: $username, password: $password}) {\n      accessToken\n    }\n  }\n": types.SignInDocument,
    "\n\n  query GetRepositories{\n    repositories {\n      edges {\n        node {\n          description\n          forksCount\n          fullName\n          language\n          ownerAvatarUrl\n          stargazersCount\n          reviewCount\n          ratingAverage\n          id\n        }\n      }\n    }\n  }\n\n": types.GetRepositoriesDocument,
    "\n  query GetMe{\n    me {\n      id\n      username\n    }\n  }\n": types.GetMeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($username: String!, $password: String!){\n    authenticate(credentials:{username: $username, password: $password}) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($username: String!, $password: String!){\n    authenticate(credentials:{username: $username, password: $password}) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\n  query GetRepositories{\n    repositories {\n      edges {\n        node {\n          description\n          forksCount\n          fullName\n          language\n          ownerAvatarUrl\n          stargazersCount\n          reviewCount\n          ratingAverage\n          id\n        }\n      }\n    }\n  }\n\n"): (typeof documents)["\n\n  query GetRepositories{\n    repositories {\n      edges {\n        node {\n          description\n          forksCount\n          fullName\n          language\n          ownerAvatarUrl\n          stargazersCount\n          reviewCount\n          ratingAverage\n          id\n        }\n      }\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe{\n    me {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetMe{\n    me {\n      id\n      username\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;