import { gql } from "../__generated__/gql";


export const SIGNIN = gql(`
  mutation SignIn($username: String!, $password: String!){
    authenticate(credentials:{username: $username, password: $password}) {
      accessToken
    }
  }
`);
export const ADD_REVIEW = gql(`
  mutation addReview($ownerName: String!, $rating: Int!, $repositoryName: String!,
$text: String) {
  createReview(review:  {
     ownerName: $ownerName
     rating: $rating
     repositoryName: $repositoryName
     text: $text
  }) {
    repositoryId
  }
}

`);
