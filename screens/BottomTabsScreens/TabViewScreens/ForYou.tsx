import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useMutation} from '@apollo/client';

import * as M from '../../../operations/mutations/user';
import {removeTokenFromStorage} from '../../../utils';
import {showIntro} from '../../../utils';
import {authVar} from '../../../cache';

export default function ForYou() {
  const [logout] = useMutation(M.LOG_OUT, {
    onCompleted: () => {
      removeTokenFromStorage();
      authVar({
        isAuthenticated: false,
        user: null,
      });
    },
  });

  const _logout = async () => {
    try {
      await GoogleSignin.signOut();
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>ForYou screen</Text>
      <Button mode="contained" onPress={() => showIntro()}>
        Show intro again
      </Button>

      <Button icon="logout" mode="contained" color="pink" onPress={_logout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
