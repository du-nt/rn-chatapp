import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Badge} from 'react-native-paper';
import {useReactiveVar} from '@apollo/client';

import {connect} from '../../socket';
import {authVar} from '../../cache';

type User = {
  _id: string;
  avatar: string;
  displayName: string;
  isOnline: boolean;
};

export default function People() {
  const [friends, setFriends] = useState([]);
  const {user} = useReactiveVar(authVar);

  useEffect(() => {
    socket.emit('getUsers');
    socket.on('friendList', users => {
      console.log(users);
      setFriends(users);
    });
    socket.on('online', userId => {
      console.log(userId);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Setting screen</Text>
      {friends.map(({_id, avatar, displayName, isOnline}: User) => (
        <View style={styles.userItem} key={_id}>
          <View>
            {avatar ? (
              <Avatar.Image size={24} source={{uri: avatar}} />
            ) : (
              <Avatar.Text
                color="white"
                style={styles.textAvatar}
                size={24}
                label={displayName.charAt(0)}
              />
            )}
            {isOnline && <Badge style={styles.badgeOnline} size={8} />}
          </View>
          <Text>{displayName}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  userItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeOnline: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
  },
  textAvatar: {
    backgroundColor: '#ff5722',
  },
});
