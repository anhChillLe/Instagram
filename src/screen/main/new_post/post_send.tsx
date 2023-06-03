import React, { useContext, useState } from 'react'
import { RouteProp } from '@react-navigation/native'

import { Image, Text, View, TextInput } from 'react-native'
import { IconButton, } from 'react-native-paper'
import { Icons } from '../../../assets/icons/png/icons'
import { Post } from '../../../models/Post'
import { NavigationContext } from '@react-navigation/native'
import { MainScreensNames, PostScreensNames } from '../../../constants/screen-name'
import { PostParamList } from './post_create'

type PostScreenRoute = RouteProp<PostParamList, PostScreensNames.postSend>;

export default function PostSend({ route }: { route: PostScreenRoute }) {
    const [caption, setCaption] = useState<string>('')
    const { uri } = route.params
    const navigation = useContext(NavigationContext)

    const post: Post = {
        id: '100',
        avatar: uri,
        name: 'Chill Lê',
        img: uri,
        caption: caption,
        comment: 99,
        like: 10,
        createAt: 0,
        isLiked: false
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                <IconButton icon={Icons.back} />
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Bài viết mới</Text>
                <View style={{ flex: 1 }} />
                <IconButton
                    icon={Icons.sendHorizontal}
                    onPress={() => {
                        navigation?.navigate({
                            name: MainScreensNames.home,
                            params: { post },
                            merge: true
                        })
                    }}
                />
            </View>
            <View style={{ marginHorizontal: 16, flexDirection: 'row' }}>
                <Image source={{ uri: uri }} style={{ height: 96, width: 96, borderRadius: 2 }} />
                <TextInput
                    placeholder='Viết chú thích...'
                    style={{
                        fontSize: 16,
                        marginStart: 8,
                        flex: 1,
                    }}
                    multiline={true}
                    onChangeText={(text) => setCaption(text)}
                />
            </View>
        </View>
    )
}