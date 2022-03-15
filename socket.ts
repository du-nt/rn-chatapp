import {io} from 'socket.io-client';
import EncryptedStorage from 'react-native-encrypted-storage';

// const getToken = async () => await EncryptedStorage.getItem('accessToken');
// const token = getToken();
// console.log(token);

// export const socket = io('http://192.168.0.103:5000', {
//   query: {token},
// });

export const connect = async () => {
  const token = await EncryptedStorage.getItem('accessToken');
  return io('http://192.168.0.103:5000', {
    query: {token},
  });
};
