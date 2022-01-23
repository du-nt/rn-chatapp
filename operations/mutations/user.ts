import {gql} from '@apollo/client';

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(registerInput: $input) {
      _id
      displayName
      email
    }
  }
`;

export const SOCIAL_LOGIN = gql`
  mutation socialLogin($idToken: String!) {
    socialLogin(idToken: $idToken) {
      user {
        _id
        email
        displayName
      }
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
        displayName
      }
      accessToken
      refreshToken
    }
  }
`;

export const LOG_OUT = gql`
  mutation logout {
    logout
  }
`;
