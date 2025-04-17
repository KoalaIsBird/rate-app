import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation SignIn($username: String!, $password: String!){
    authenticate(credentials:{username: $username, password: $password}) {
      accessToken
    }
  }
`;
