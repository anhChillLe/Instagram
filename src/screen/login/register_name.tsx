import React, { PureComponent, useContext } from 'react'
import { View, Text } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Icons } from '../../assets/icons/png/icons'
import { NavigationContext } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginScreenNames } from '../../constants/screen-name'

function Toolbar() {
    const navigation = useContext(NavigationContext)
    return (
        <View style={{marginStart: 4}}>
            <IconButton icon={Icons.back} onPress={() => navigation?.goBack()} />
        </View>
    )
}

export default function RegisterName() {
    const navigation = useContext(NavigationContext)

    function sendSMS() {
        
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Toolbar />

            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                <View style={{ flex: 1, width: '90%' }}>
                    <Text style={{ fontSize: 26, fontWeight: '700' }}>Bạn tên gì?</Text>
                    <Text style={{ marginTop: 4, fontWeight: '600', lineHeight: 24 }}>

                    </Text>

                    <TextInput
                        inputMode='text'
                        mode='outlined'
                        style={{ padding: 8 }}
                        placeholder='Tên người dùng'
                    // maxLength={50}
                    ></TextInput>

                    <Button
                        mode='contained'
                        buttonColor='black'
                        textColor='white'
                        style={{ marginTop: 32 }}
                        onPress={() => navigation?.navigate(LoginScreenNames.registerEmail)}
                    >Tiếp</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}