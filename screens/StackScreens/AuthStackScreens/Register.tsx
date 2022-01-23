import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, TextInput} from 'react-native-paper';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from '@apollo/client';

import {AuthStackParamList} from '../../../navigators/StackNavigators/AuthStackNavigator';
import * as M from '../../../operations/mutations/user';

type RegisterProps = StackNavigationProp<AuthStackParamList, 'Register'>;

type RegisterInputs = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultValues: RegisterInputs = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  displayName: Yup.string().max(25, 'Display name must have max 25 characters'),
  email: Yup.string().email('Email not valid').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6')
    .max(30, 'Password too long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password not match')
    .required('Confirm password is required'),
});

export default function Register() {
  const navigation = useNavigation<RegisterProps>();
  const [register] = useMutation(M.REGISTER, {
    onCompleted: ({register}) => {
      console.log(register);
    },
    onError: err => {
      console.log(err.graphQLErrors[0]);
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: {errors},
  } = useForm<RegisterInputs>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: RegisterInputs) => {
    register({
      variables: {input: values},
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Controller
          name="displayName"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              label="Display Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.displayName}
            />
          )}
        />
        {errors.displayName && <Text>{errors.displayName.message}</Text>}
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              label="Email"
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
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              error={!!errors.password}
            />
          )}
        />
        {errors.password && <Text>{errors.password.message}</Text>}
        <Controller
          name="confirmPassword"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              label="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              error={!!errors.confirmPassword}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text>{errors.confirmPassword.message}</Text>
        )}
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Register
        </Button>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Go to login</Text>
      </TouchableOpacity>
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
});
