import React, { PureComponent, useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Icons } from '../../assets/icons/png/icons'
import { NavigationContext } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginScreenNames } from '../../constants/screen-name'
import { firebase } from '@react-native-firebase/auth'

function Toolbar() {
    const navigation = useContext(NavigationContext)
    return (
        <View  style={{ marginStart: 4 }}>
            <IconButton icon={Icons.back} onPress={() => navigation?.goBack()} />
        </View>
    )
}

export default function RegisterEmail() {
    const navigation = useContext(NavigationContext)

    function sendSMS() {
        // firebase.auth().sendSignInLinkToEmail(email)
    }
    const [email, setEmail] = useState('')

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Toolbar />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <View style={{ flex: 1, width: '90%' }}>
                    <Text style={{ fontSize: 26, fontWeight: '700' }}>Email của bạn là gì?</Text>
                    <Text style={{ marginTop: 4, fontWeight: '600', lineHeight: 24 }}>
                        Nhập email có dùng để liên hệ với bạn.
                        Thông tin này sẽ không hiển thị với ai khác trên trang cá nhân của bạn
                    </Text>

                    <TextInput
                        inputMode='text'
                        mode='outlined'
                        style={{ padding: 4 }}
                        placeholder='Email'
                        right={<TextInput.Icon
                            icon={Icons.sendHorizontal}
                            size={18}
                            onPress={sendSMS}
                        />}
                        autoCapitalize='none'
                        maxLength={50}
                        value={email}
                        onChangeText={setEmail}
                    ></TextInput>

                    <TextInput
                        inputMode='numeric'
                        mode='outlined'
                        style={{ padding: 4 }}
                        placeholder='Mã xác thực'
                        maxLength={6}
                    ></TextInput>

                    <Text style={{ marginTop: 4, fontWeight: '600', lineHeight: 24 }}>
                        Chúng tôi có thể gửi thông báo cho bạn qua Email vì mục đích bảo mật và đăng nhập
                    </Text>

                    <Button
                        mode='contained'
                        buttonColor='black'
                        textColor='white'
                        style={{ marginTop: 32 }}
                        onPress={() => {
                            if(email)
                                navigation?.navigate(LoginScreenNames.registerPassword, {email: email})
                        }}
                    >Tiếp</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}