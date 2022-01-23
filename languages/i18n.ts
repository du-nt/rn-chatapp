import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as RNLocalize from 'react-native-localize';

import en from './en';
import fr from './fr';
import cn from './cn';

const resources = {
  en,
  fr,
  cn,
};

const LANG_CODES = Object.keys(resources);

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    try {
      const language = await EncryptedStorage.getItem('user-language');
      console.log(language);
      if (!language) {
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);
        console.log(findBestAvailableLanguage);
        return callback(findBestAvailableLanguage?.languageTag || 'en');
      }

      callback(language);
    } catch (error) {
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    EncryptedStorage.setItem('user-language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
