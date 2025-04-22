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

export const GET_REPO = gql(`
  query GetRepository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    description
    forksCount
    fullName
    id
    language
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
  }
}
  `);
export const GET_REVIEWS = gql(`
query GetReviews($id: ID!){
  repository(id: $id) {
    id
    fullName
    reviews {
      edges {
        node {
          ...ReviewFields
        }
      }
    }
  }
}

fragment ReviewFields on Review {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
`);
