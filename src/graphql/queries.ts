import { gql } from '../__generated__/gql';

const ReviewFieldsFragment = gql(`  
fragment ReviewFields on Review {
  id
  text
  rating
  createdAt
  repositoryId
  repository {
    fullName
  }
  user {
    id
    username
  }
}
`);

export const GET_REPOSITORIES = gql(`

query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
        cursor 
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }

`);

export const ME = gql(`
  query GetMe($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }

    }
  }


`);

export const GET_REPO = gql(`
  query GetRepository($repositoryId: ID!, $after: String, $first: Int ) {
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
    reviews(after: $after, first: $first) {
      edges {
        node {
          ...ReviewFields
        }
        cursor
      }pageInfo {
       endCursor
       startCursor
       hasNextPage 
      }
    }
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


`);
