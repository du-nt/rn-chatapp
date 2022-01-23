import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {AuthStackParamList} from '../../../navigators/StackNavigators/AuthStackNavigator';
import * as M from '../../../operations/mutations/user';
import {saveTokenToStorage} from '../../../utils';
import {authVar} from '../../../cache';

type LoginProps = StackNavigationProp<AuthStackParamList, 'Login'>;

type LoginInputs = {
  email: string;
  password: string;
};

const defaultValues: LoginInputs = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email not valid').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6')
    .max(30, 'Password too long')
    .required('Password is required'),
});

export default function Login() {
  const navigation = useNavigation<LoginProps>();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onDismissSnackBar = () => setVisible(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: {errors},
  } = useForm<LoginInputs>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

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

  const [login] = useMutation(M.LOGIN, {
    onCompleted: ({login}) => {
      const {accessToken, refreshToken, user} = login;
      saveTokenToStorage(accessToken, refreshToken);
      authVar({
        isAuthenticated: true,
        user,
      });
    },
    onError: err => {
      // console.log(err.graphQLErrors[0].extensions.errors);
    },
  });

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

  const onSubmit = (values: LoginInputs) => {
    login({
      variables: values,
    });
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
      <View style={styles.form}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              label="Email"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              error={!!errors.email}
            />
          )}
        />
        {errors.email && <Text>{errors.email.message}</Text>}
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              label="Password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text>{errors.password.message}</Text>}
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Login
        </Button>
      </View>
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
    // alignItems: 'center',
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
  form: {
    // flex: 1,
    // alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  input: {},
});
