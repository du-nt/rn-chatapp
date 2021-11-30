import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator size="large" color={Colors.red800} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
