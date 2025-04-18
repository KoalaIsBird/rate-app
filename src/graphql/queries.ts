import { gql } from '../__generated__/gql';

export const GET_REPOSITORIES = gql(`

  query GetRepositories{
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
          id
        }
      }
    }
  }

`);

export const ME = gql(`
  query GetMe{
    me {
      id
      username
    }
  }
`);
