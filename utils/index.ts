import EncryptedStorage from 'react-native-encrypted-storage';

import {authVar, isDarkThemeVar} from '../cache';
import * as Q from '../operations/queries/user';
import {client} from '../index';

export const saveTokenToStorage = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    EncryptedStorage.setItem('accessToken', accessToken);
    EncryptedStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const removeTokenFromStorage = async () => {
  try {
    EncryptedStorage.removeItem('accessToken');
    EncryptedStorage.removeItem('refreshToken');
  } catch (error) {
    console.log(error);
  }
};

export const saveTheme = async (theme: boolean) => {
  try {
    await EncryptedStorage.setItem('isDarkTheme', JSON.stringify(theme));
  } catch (error) {
    console.log(error);
  }
};

export const hideIntro = async () => {
  try {
    await EncryptedStorage.setItem('hideIntro', JSON.stringify(true));
  } catch (error) {
    console.log(error);
  }
};

export const showIntro = async () => {
  try {
    await EncryptedStorage.removeItem('hideIntro');
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const {data} = await client.query({
      query: Q.GET_ME,
    });
    authVar({
      isAuthenticated: true,
      user: data.getMe,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getSavedTheme = async () => {
  try {
    const isDarkThemeResult = await EncryptedStorage.getItem('isDarkTheme');
    const isDarkTheme = isDarkThemeResult && JSON.parse(isDarkThemeResult);
    isDarkTheme && isDarkThemeVar(true);
  } catch (error) {
    console.log(error);
  }
};

export const getIntroVisibilityStatus = async (
  fn: (isHide: boolean) => void,
) => {
  try {
    const isHideIntroResult = await EncryptedStorage.getItem('hideIntro');
    const isHideIntro = isHideIntroResult && JSON.parse(isHideIntroResult);
    if (isHideIntro) {
      await fn(true);
    }
  } catch (error) {
    console.log(error);
  }
};
