import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
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
`;
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
