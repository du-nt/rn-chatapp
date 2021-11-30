import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Snackbar} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useMutation} from '@apollo/client';

import {AuthStackParamList} from '../../../navigators/StackNavigators/AuthStackNavigator';
import * as M from '../../../operations/mutations/user';
import {saveTokenToStorage} from '../../../utils';
import {authVar} from '../../../cache';

type LoginProps = StackNavigationProp<AuthStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<LoginProps>();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onDismissSnackBar = () => setVisible(false);

  const [socialLogin] = useMutation(M.SOCIAL_LOGIN, {
    onCompleted: ({socialLogin}) => {
      const {accessToken, refreshToken, user} = socialLogin;
      saveTokenToStorage(accessToken, refreshToken);
      authVar({
        isAuthenticated: true,
        user,
      });
    },
    onError: err => {
      setMessage(err.message);
      setVisible(true);
    },
  });
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '1005743080377-qm7ghvvnngla9qob8uu22dgf8oo5flfa.apps.googleusercontent.com',
  //   });
  // }, []);

  const _googleLogin = async () => {
    try {
      const res = await GoogleSignin.signIn();

      const providers = await auth().fetchSignInMethodsForEmail(res.user.email);

      if (providers.length && providers[0] !== 'google.com') {
        GoogleSignin.signOut();
        throw new Error('This email address is already being used');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);

      const {user} = await auth().signInWithCredential(googleCredential);

      const idToken = await user.getIdToken();
      socialLogin({variables: {idToken}});
    } catch (error) {
      if (error.message) {
        setMessage(error.message);
        setVisible(true);
      }
    }
  };

  const _faceBookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const {user} = await auth().signInWithCredential(facebookCredential);
      const idToken = await user.getIdToken();
      socialLogin({variables: {idToken}});
    } catch (error) {
      if (error.message) {
        setMessage(error.message);
        setVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Snackbar
        style={styles.snackBar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}>
        {message}
      </Snackbar>
      <Text>Login screen </Text>
      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        <Text>Go to register</Text>
      </Button>
      <Button icon="google" mode="contained" color="red" onPress={_googleLogin}>
        Google Login
      </Button>
      <Button icon="facebook" mode="contained" onPress={_faceBookLogin}>
        Facebook Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  snackBar: {
    backgroundColor: 'red',
  },
});
