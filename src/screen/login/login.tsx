import React, { PropsWithChildren, useContext } from 'react'
import {
    View,
    StatusBar,
    StyleSheet,
    Image,
    ImageRequireSource,
    Alert,
    DeviceEventEmitter,
} from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { LoginScreenNames, RootScreenNames } from '../../constants/screen-name'
import { Icons } from '../../assets/icons/png/icons'
import { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import * as Keychain from 'react-native-keychain';

const myEmail = 'chill@gmail.com'
const myPassword = 'leanhchieu'

function CheckLogin(email: string, password: string): boolean {
    return email === myEmail && password === myPassword
}

function validateEmail(email: string): boolean {
    // var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return regex.test(email);
    return true
}

function isValidPassword(email: string): boolean {
    return true
}

const Login = () => {
    const navigation = useContext(NavigationContext)

    const [email, setEmail] = React.useState('')
    const [isValidEmail, setIsValidEmail] = React.useState(true)
    const [password, setPassword] = React.useState('')
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    function Login() {
        if (email === '' || password === '') return
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (credential) => {

                const user = credential.user

                await Keychain.setInternetCredentials('firebase', email, password)

                if (user.phoneNumber)
                    DeviceEventEmitter.emit('login_success')
                else
                    navigation?.navigate(LoginScreenNames.registerPhone)
            })
            .catch(() => { Alert.alert('Sai mật khẩu!') })
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />

            <View style={styles.loginContainer} >
                <Image
                    source={Icons.instagramText}
                    style={styles.instagramLogo}
                    resizeMode='contain'
                />

                <TextInput
                    style={styles.input}
                    mode='outlined'
                    inputMode='email'
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                        setIsValidEmail(validateEmail(email))
                    }}
                    label={'Tên người dùng, email/số di động'}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    mode='outlined'
                    value={password}
                    onChangeText={setPassword}
                    label={'Nhập password'}
                    secureTextEntry={!isShowPassword}
                    right={<TextInput.Icon
                        icon={isShowPassword ? Icons.hide : Icons.show}
                        onPress={() => setIsShowPassword(!isShowPassword)}
                    />}
                    autoCapitalize='none'
                />
                <Button
                    mode='text'
                    style={{ width: '100%', alignItems: 'flex-end' }}
                    textColor='#4267B2'
                >Quên mật khẩu?</Button>
                <Button
                    mode='contained'
                    buttonColor='black'
                    textColor='white'
                    style={{ marginTop: 16, width: '100%' }}
                    onPress={Login}>
                    Đăng nhập
                </Button>
                <TextDivider>OR</TextDivider>
                <View style={{ paddingTop: 6 }}>
                    <LoginWithButton logo={Icons.facebook}>Đăng nhập với Facebook</LoginWithButton>
                    <LoginWithButton logo={Icons.google}>Đăng nhập với Google</LoginWithButton>
                </View>
                <Button
                    mode='outlined'
                    textColor='black'
                    style={{ marginTop: 16, width: '100%' }}
                    onPress={() => navigation?.navigate(LoginScreenNames.registerName)}>
                    Tạo tài khoản mới
                </Button>
                <Image
                    source={Icons.meta}
                    style={styles.metaLogo}
                    resizeMode='contain' />
            </View>

        </View>
    )
}

function TextDivider({ children }: PropsWithChildren) {
    return (
        <View style={{ flexDirection: 'row', paddingTop: 32, alignItems: 'center' }}>
            <Divider horizontalInset={true} style={{ flex: 1 }} />
            <Text style={{ fontSize: 14, fontWeight: '600' }}>{children}</Text>
            <Divider horizontalInset={true} style={{ flex: 1 }} />
        </View>
    )
}

async function onGoogleButtonPress() {
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // const { idToken } = await GoogleSignin.signIn()
    // const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    // return firebase.auth().signInWithCredential(googleCredential);
}

function LoginWithButton({ logo, children }: PropsWithChildren<{ logo: ImageRequireSource; }>) {
    return (
        <Button
            mode='text'
            textColor='#4267B2'
            style={styles.loginWith}
            icon={({ size }) => <Image source={logo} style={{ width: size, height: size }} />}
            onPress={() => {
                onGoogleButtonPress()
            }}
        >
            {children}
        </Button>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 4,
        borderRadius: 16,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loginContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    instagramLogo: {
        width: '80%',
        height: 120,
        marginTop: 64,
    },
    metaLogo: {
        width: 60,
        height: 24,
        tintColor: 'gray',
        margin: 16,
    },
    loginWith: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 0
    }
})

export default Login