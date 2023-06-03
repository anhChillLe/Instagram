import React, { useContext, useState } from 'react'
import { Image, ImageRequireSource, ImageSourcePropType, ImageURISource, StyleSheet, Text, View } from 'react-native'
import { Icons } from '../../../assets/icons/png/icons'
import { Images } from '../../../assets/image/image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, IconButton } from 'react-native-paper'
import { PERMISSIONS, request } from 'react-native-permissions'
import { CameraOptions, launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker'
import { NavigationContext } from '@react-navigation/native'

export default function ImagePicker() {
    const [image, setImage] = useState<ImageSourcePropType>(Images.placeHolder)
    const [isExpand, setExpand] = useState(true)

    function parseResult(result: ImagePickerResponse) {
        const assets = result.assets
        if (!assets) return
        const { uri } = assets[0]
        setImage({ uri: uri })
    }

    function openCamera() {
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
            if (result !== 'granted') return
            launchCamera(options, (result) => {
                parseResult(result)
            })
        })
    }

    function openLibrary() {
        launchImageLibrary(options, (result) => {
            parseResult(result)
        })
    }

    function checkUri(): boolean {
        const uri = (image as ImageURISource)?.uri ?? ""
        return Boolean(uri)
    }

    const options: CameraOptions = {
        mediaType: 'photo',
        saveToPhotos: true
    };

    const navigation = useContext(NavigationContext)

    return (
        <View>
            <View style={styles.toolbar}>
                <IconButton icon={Icons.clear} />
                <Text style={styles.title}>Bài viết mới</Text>
                <View style={{ flex: 1 }} />
                <IconButton icon={Icons.next} onPress={() => {
                    const uri = (image as ImageURISource)?.uri ?? ""
                    if (!uri) return
                    navigation?.navigate({
                        name: 'PostSend',
                        params: { uri },
                        merge: false
                    })
                }} />
            </View>
            <View style={{ width: '100%', height: '70%', backgroundColor: '#ebebeb' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={image}
                    resizeMode={isExpand ? 'cover' : 'contain'}
                />
                {checkUri() ?
                    <IconButton
                        icon={isExpand ? Icons.zoomIn : Icons.zoomOut}
                        onPress={() => {
                            setExpand(!isExpand)
                        }}
                        style={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                            backgroundColor: '#363636',
                            padding: 4,
                        }}
                        iconColor='white'
                        animated={true}
                    />
                    : null
                }
            </View>
            <View style={styles.toolbar}>
                <Button mode='outlined' onPress={openLibrary}>Thư viện</Button>
                <View style={{ flex: 1 }} />
                <IconButton
                    style={{ backgroundColor: '#e0e0e0', marginEnd: 16 }}
                    icon={Icons.instagram}
                    onPress={openCamera}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    toolbar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 16,
        marginHorizontal: 8,
    },

    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },

    title: {
        fontSize: 18,
        marginStart: 16,
        fontWeight: '600',
    }
})