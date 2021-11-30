import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import {useReactiveVar} from '@apollo/client';

import AppIntro from './screens/AppIntroScreens';
import AuthStack from './navigators/StackNavigators/AuthStackNavigator';
import RootDrawer from './navigators/RootDrawerNavigator';

import {getCurrentUser, getIntroVisibilityStatus, getSavedTheme} from './utils';
import {authVar} from './cache';
import {useTheme} from './hooks';
import {CombinedDarkTheme, CombinedDefaultTheme} from './configs/themeConfig';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [hideIntroScreen, setHideIntroScreen] = useState(false);

  const {isDarkTheme} = useTheme();
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  const {isAuthenticated} = useReactiveVar(authVar);
  const todos = [['hello']];
  const _onDoneIntro = () => setShowRealApp(true);

  useEffect(() => {
    const init = async () => {
      await getCurrentUser();
      await getSavedTheme();
      await getIntroVisibilityStatus(setHideIntroScreen);
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        {!hideIntroScreen && !showRealApp ? (
          <AppIntro _onDoneIntro={_onDoneIntro} />
        ) : (
          <NavigationContainer theme={theme}>
            {isAuthenticated ? <RootDrawer /> : <AuthStack />}
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </PaperProvider>
  );
}
