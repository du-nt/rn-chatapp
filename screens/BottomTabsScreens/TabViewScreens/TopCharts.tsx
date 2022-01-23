import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

export default function TopCharts() {
  const onDisplayNotification = async () => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'hello',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'home', // optional, defaults to 'ic_launcher'.
      },
    });
  };

  const onCreateTriggerNotification = async () => {
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 1000 * 10,
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'hello',
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
        },
      },
      trigger,
    );
  };

  return (
    <View style={styles.container}>
      <Text>TopCharts screen</Text>
      <Button mode="contained" onPress={() => onDisplayNotification()}>
        Display Notification
      </Button>
      <Button
        mode="contained"
        color="red"
        onPress={() => onCreateTriggerNotification()}>
        Create Trigger Notification
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
