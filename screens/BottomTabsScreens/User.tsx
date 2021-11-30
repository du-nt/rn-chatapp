import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigators/StackNavigators/RootStackNavigator';

type UserProps = StackNavigationProp<RootStackParamList, 'Favorite'>;

export default function User() {
  const navigation = useNavigation<UserProps>();
  return (
    <View style={styles.container}>
      <Text>User screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favorite')}>
        <Text>Go to Favorite Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
