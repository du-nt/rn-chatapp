import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Setting() {
  return (
    <View style={styles.container}>
      <Text>Setting screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
