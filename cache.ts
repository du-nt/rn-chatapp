import {InMemoryCache, makeVar} from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isDarkTheme: {
          read() {
            return isDarkThemeVar();
          },
        },
        auth: {
          read() {
            return authVar();
          },
        },
      },
    },
  },
  addTypename: false,
});

/**
 * Set initial values when we create cache variables.
 */
const isDarkThemeInitialValue = false;
export const isDarkThemeVar = makeVar<boolean>(isDarkThemeInitialValue);

type User = {
  _id: string;
  displayName: string;
  email: string;
};
type Auth = {
  isAuthenticated: boolean;
  user: User | null;
};
const authInitialValue: Auth = {
  isAuthenticated: false,
  user: null,
};

export const authVar = makeVar<Auth>(authInitialValue);
