import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImagePicker from './image_picker';
import PostSend from './post_send';
import { PostScreensNames } from '../../../constants/screen-name';

export type PostParamList = {
    [PostScreensNames.imagePicker]: undefined
    [PostScreensNames.postSend]: {
        uri: string
    }
}

const PostCreateStack = createStackNavigator<PostParamList>();

export default function PostCreate() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PostCreateStack.Navigator
                initialRouteName={PostScreensNames.imagePicker}
                screenOptions={{ headerShown: false }}
            >
                <PostCreateStack.Screen name={PostScreensNames.imagePicker} component={ImagePicker} />
                <PostCreateStack.Screen name={PostScreensNames.postSend} component={PostSend} />
            </PostCreateStack.Navigator>
        </SafeAreaView>
    )
}