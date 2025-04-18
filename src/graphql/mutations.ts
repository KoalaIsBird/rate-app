import { gql } from "../__generated__/gql";

export const SIGNIN = gql(`
  mutation SignIn($username: String!, $password: String!){
    authenticate(credentials:{username: $username, password: $password}) {
      accessToken
    }
  }
`);
