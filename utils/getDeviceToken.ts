import messaging from '@react-native-firebase/messaging';

export default async function getDeviceToken() {
  const token = await messaging().getToken();
  // console.log(token);
}
