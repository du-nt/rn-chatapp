import {gql} from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    getMe {
      _id
      email
      displayName
    }
  }
`;

export const RENEW_TOKEN = gql`
  query renewToken($token: String!) {
    renewToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

export const HELLO = gql`
  query hello {
    hello
  }
`;
