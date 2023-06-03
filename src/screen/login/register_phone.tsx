import React, { PureComponent, useContext, useEffect, useState } from 'react'
import { View, Text, Alert, Keyboard, DeviceEventEmitter } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Icons } from '../../assets/icons/png/icons'
import { NavigationContext } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginScreenNames } from '../../constants/screen-name'
import { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth'

function Toolbar() {
    const navigation = useContext(NavigationContext)
    return (
        <View style={{ marginStart: 4 }}>
            <IconButton icon={Icons.back} onPress={() => navigation?.goBack()} />
        </View>
    )
}

export default function RegisterPhone() {
    const navigation = useContext(NavigationContext)

    const [phoneNumber, setPhoneNumber] = React.useState('')

    const [confirm, setConfirm] = useState<FirebaseAuthTypes.PhoneAuthSnapshot>();
    const [initializing, setInitializing] = useState(true);
    const [code, setCode] = useState('');
    const [user, setUser] = useState<FirebaseAuthTypes.User>();


    function onAuthStateChanged(user: FirebaseAuthTypes.User) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        if (!user) return
        const subscriber = firebase.auth().onAuthStateChanged(() => onAuthStateChanged(user));
        return subscriber; // unsubscribe on unmount
    }, []);


    async function sendSMS() {
        Keyboard.dismiss()
        const confirmation = await firebase.auth().verifyPhoneNumber('+84' + phoneNumber);
        setConfirm(confirmation);
    }

    async function verifyCode() {
        const user = firebase.auth().currentUser
        if (!user || !confirm) return

        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(confirm.verificationId, code);
            let userData = user.linkWithCredential(credential)
            setUser((await userData).user);
            DeviceEventEmitter.emit('login_success')
        } catch (error) {
            console.log('Account linking error');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Toolbar />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <View style={{ flex: 1, width: '90%' }}>
                    <Text style={{ fontSize: 26, fontWeight: '700' }}>Số di động của bạn là gì?</Text>
                    <Text style={{ marginTop: 4, fontWeight: '600', lineHeight: 24 }}>
                        Nhập số di động có dùng để liên hệ với bạn.
                        Thông tin này sẽ không hiển thị với ai khác trên trang cá nhân của bạn
                    </Text>

                    <TextInput
                        inputMode='numeric'
                        mode='outlined'
                        style={{ padding: 4 }}
                        placeholder='Số di động'
                        right={<TextInput.Icon
                            icon={Icons.sendHorizontal}
                            size={18}
                            onPress={sendSMS}
                        />}
                        maxLength={11}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />

                    <TextInput
                        inputMode='numeric'
                        mode='outlined'
                        style={{ padding: 4 }}
                        placeholder='Mã xác thực'
                        maxLength={6}
                        value={code}
                        onChangeText={setCode}
                    />

                    <Text style={{ marginTop: 4, fontWeight: '600', lineHeight: 24 }}>
                        Chúng tôi có thể gửi thông báo cho bạn qua SMS vì mục đích bảo mật và đăng nhập
                    </Text>

                    <Button
                        mode='contained'
                        buttonColor='black'
                        textColor='white'
                        style={{ marginTop: 32 }}
                        onPress={() => verifyCode()}
                    >Tiếp</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}