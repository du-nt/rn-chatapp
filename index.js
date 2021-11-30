/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Root from './App';
import { name as appName } from './app.json';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
} from '@apollo/client';
import EncryptedStorage from 'react-native-encrypted-storage';
import jwt_decode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';

import { authVar, cache } from './cache';
import * as Q from './operations/queries/user';
import { saveTokenToStorage } from './utils';

let refreshTokenRequest = null;

const renewTokenApiClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://apollo-server-rn.herokuapp.com/graphql',
  }),
  cache
})

const renewToken = async () => {
  try {
    const token = await EncryptedStorage.getItem('refreshToken');
    if (!token) return null;

    const { data } = await renewTokenApiClient.query({
      query: Q.RENEW_TOKEN,
      variables: { token },
    });
    const { renewToken: { accessToken, refreshToken } } = data
    await saveTokenToStorage(
      accessToken,
      refreshToken,
    );
    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getToken = async () => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    if (!accessToken) return null;

    const decoded = jwt_decode(accessToken);
    if (!decoded) return null;

    const expirationTime = decoded.exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : renewToken();
      const newAccessToken = await refreshTokenRequest;
      refreshTokenRequest = null;
      return newAccessToken;
    }
    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  if (!token) { authVar({ isAuthenticated: false, user: null }) }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://apollo-server-rn.herokuapp.com/graphql',
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache,
  connectToDevTools: true,
});

const App = () => (
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
