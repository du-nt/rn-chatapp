import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import {useReactiveVar} from '@apollo/client';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

import AppIntro from './screens/AppIntroScreens';
import AuthStack from './navigators/StackNavigators/AuthStackNavigator';
import RootDrawer from './navigators/RootDrawerNavigator';
import {RootStackParamList} from './navigators/StackNavigators/RootStackNavigator';

import {getCurrentUser, getIntroVisibilityStatus, getSavedTheme} from './utils';
import getDeviceToken from './utils/getDeviceToken';
import {authVar} from './cache';
import {useTheme} from './hooks';
import {CombinedDarkTheme, CombinedDefaultTheme} from './configs/themeConfig';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [hideIntroScreen, setHideIntroScreen] = useState(false);

  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  const {isDarkTheme} = useTheme();
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  const {isAuthenticated} = useReactiveVar(authVar);
  const _onDoneIntro = () => setShowRealApp(true);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        getCurrentUser(),
        getSavedTheme(),
        getIntroVisibilityStatus(setHideIntroScreen),
        getDeviceToken(),
      ]);
      console.log('hello baby');
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('objecaat', remoteMessage);
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage?.data?.type === 'Navigate') {
          navigationRef.navigate('Favorite');
        }
      });
      await messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage?.data?.type === 'Navigate') {
            navigationRef.navigate('Favorite');
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1005743080377-qm7ghvvnngla9qob8uu22dgf8oo5flfa.apps.googleusercontent.com',
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        {!hideIntroScreen && !showRealApp ? (
          <AppIntro _onDoneIntro={_onDoneIntro} />
        ) : (
          <NavigationContainer ref={navigationRef} theme={theme}>
            {isAuthenticated ? <RootDrawer /> : <AuthStack />}
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </PaperProvider>
  );
}
