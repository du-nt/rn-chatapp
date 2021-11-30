import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AuthStackParamList} from '../../../navigators/StackNavigators/AuthStackNavigator';

type RegisterProps = StackNavigationProp<AuthStackParamList, 'Register'>;

export default function Register() {
  const navigation = useNavigation<RegisterProps>();
  return (
    <View style={styles.container}>
      <Text>Register screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text>Go to login</Text>
      </TouchableOpacity>
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
});
