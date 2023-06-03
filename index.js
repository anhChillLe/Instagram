import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';

import PhoneVerification from './src/screen/test/verifyPhoneNumber';

AppRegistry.registerComponent(appName, () => App);

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});