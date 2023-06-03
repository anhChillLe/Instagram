import { firebase } from '@react-native-firebase/auth'
import React, { PureComponent } from 'react'
import { DeviceEventEmitter, View } from 'react-native'
import { Button } from 'react-native-paper'
import * as Keychain from 'react-native-keychain';
import { SafeAreaView } from 'react-native-safe-area-context'

function logout() {
    firebase.auth().signOut()
        .then(async () => {
            await Keychain.resetInternetCredentials('firebase')
            DeviceEventEmitter.emit('onLogout')
        })
}

export default function UserProfile() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    mode='contained'
                    buttonColor='black'
                    textColor='white'
                    onPress={logout}
                >
                    Đăng xuất
                </Button>
            </View>
        </SafeAreaView>
    )
}