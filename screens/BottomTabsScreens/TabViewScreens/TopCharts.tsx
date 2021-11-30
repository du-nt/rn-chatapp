import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function TopCharts() {
  return (
    <View style={styles.container}>
      <Text>TopCharts screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
