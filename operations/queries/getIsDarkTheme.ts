import {gql} from '@apollo/client';

export const GET_IS_DARK_THEME = gql`
  query GetIsDarkTheme {
    isDarkTheme @client
  }
`;

// export const GET_AUTH = gql`
//   query GetAuth {
//     auth @client
//   }
// `;
