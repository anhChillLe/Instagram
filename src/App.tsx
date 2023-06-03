import React, { useEffect, useRef, useState } from 'react';

import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { CardStyleInterpolators, StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from "react-native-bootsplash";

import Login from './screen/login/login';
import MainScreenStack from './screen/main/main';
import PostCreate from './screen/main/new_post/post_create';
import { LoginScreenNames, RootScreenNames } from './constants/screen-name';
import CommentScreen from './screen/comments/comments';
import { Alert, DeviceEventEmitter } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import RegisterPhone from './screen/login/register_phone';
import RegisterPassword from './screen/login/register_password';
import RegisterName from './screen/login/register_name';
import RegisterEmail from './screen/login/register_email';
import { firebase } from '@react-native-firebase/auth';

import * as Keychain from 'react-native-keychain';

export type appRootParamList = {
  [RootScreenNames.post]: undefined
  [RootScreenNames.main]: undefined
  [RootScreenNames.comments]: undefined
}

export type appLoginParamList = {
  [LoginScreenNames.login]: undefined
  [LoginScreenNames.registerPhone]: undefined
  [LoginScreenNames.registerEmail]: undefined
  [LoginScreenNames.registerName]: undefined
  [LoginScreenNames.registerPassword]: {
    email: string
  }
}

const RootStack = createStackNavigator<appRootParamList>()
const LoginStack = createStackNavigator<appLoginParamList>()

function App() {
  const [token, setToken] = useState<boolean>(false)
  const navigationRef = useRef();

  DeviceEventEmitter.addListener('login_success', () => {
    checkLogin()
  })

  DeviceEventEmitter.addListener('onLogout', () => {
    checkLogin()
  })

  async function checkLogin() {
    const credential = await Keychain.getInternetCredentials('firebase')
    if (!credential) return
    const { username, password } = credential
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((credential) => {
        setToken(!!credential.user)
      })
  }

  useEffect(() => {
    checkLogin()
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={RNBootSplash.hide}>
        <NavigationContext.Provider value={navigationRef.current}>
          {token ? (
            <RootStack.Navigator initialRouteName={RootScreenNames.main} screenOptions={stackScreenOptions} >
              <RootStack.Screen name={RootScreenNames.main} component={MainScreenStack} />
              <RootStack.Screen name={RootScreenNames.post} component={PostCreate} />
              <RootStack.Screen name={RootScreenNames.comments} component={CommentScreen} />
            </RootStack.Navigator>
          ) : (
            <LoginStack.Navigator initialRouteName={LoginScreenNames.login} screenOptions={stackScreenOptions} >
              <LoginStack.Screen name={LoginScreenNames.login} component={Login} />
              <LoginStack.Screen name={LoginScreenNames.registerPhone} component={RegisterPhone} />
              <LoginStack.Screen name={LoginScreenNames.registerEmail} component={RegisterEmail} />
              <LoginStack.Screen name={LoginScreenNames.registerName} component={RegisterName} />
              <LoginStack.Screen name={LoginScreenNames.registerPassword} component={RegisterPassword} />
            </LoginStack.Navigator>
          )}
        </NavigationContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const stackScreenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export default App;