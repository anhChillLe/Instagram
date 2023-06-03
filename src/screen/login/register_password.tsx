import React, { PureComponent, useContext } from 'react'
import { View, Text, Alert, DeviceEventEmitter } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Icons } from '../../assets/icons/png/icons'
import { NavigationContext, RouteProp } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { firebase } from '@react-native-firebase/auth'
import { appLoginParamList } from '../../App'
import { LoginScreenNames } from '../../constants/screen-name'

function Toolbar() {
    const navigation = useContext(NavigationContext)
    return (
        <View style={{ marginStart: 8 }}>
            <IconButton icon={Icons.back} onPress={() => navigation?.goBack()} />
        </View>
    )
}

type PostScreenRoute = RouteProp<appLoginParamList, LoginScreenNames.registerPassword>;

export default function RegisterPassword({ route }: { route: PostScreenRoute }) {
    const navigation = useContext(NavigationContext)
    const email = route.params.email

    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const [error, setError] = React.useState(false)

    function registerNewUser() {
        if (password !== repeatPassword) {
            setError(true)
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                //DeviceEventEmitter.emit('login_success')
                navigation?.navigate(LoginScreenNames.registerPhone)
            })
            .catch(() => { Alert.alert('Tạo tài khoản thất bại!') })
    }

    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <Toolbar />
            <View style={{ flex: 1, width: '100%', alignItems: 'center', alignContent: 'center' }}>
                <View style={{ flex: 1, width: '90%' }}>
                    <Text style={{ fontSize: 26, fontWeight: '700' }}>Tạo mật khẩu</Text>
                    <Text style={{ marginTop: 4, fontWeight: '600', lineHeight: 24 }}>
                        Mật khẩu muốn đặt sao thì đặt.
                    </Text>

                    <TextInput
                        mode='outlined'
                        value={password}
                        onChangeText={setPassword}
                        label={'Nhập mật khẩu'}
                        secureTextEntry={!isShowPassword}
                        maxLength={24}
                        autoCapitalize='none'
                    />

                    <TextInput
                        mode='outlined'
                        value={repeatPassword}
                        onChangeText={(text) => {
                            setRepeatPassword(text)
                            setError(password !== text)
                        }}
                        label={'Nhập lại mật khẩu'}
                        secureTextEntry={!isShowPassword}
                        maxLength={24}
                        error={error}
                        autoCapitalize='none'
                    />

                    <Button
                        mode='contained'
                        buttonColor='black'
                        textColor='white'
                        style={{ marginTop: 32 }}
                        onPress={registerNewUser}
                    >Hoàn tất</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}