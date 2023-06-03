import React, { useContext } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons } from '../../assets/icons/png/icons';
import { Image, ImageSourcePropType, View } from 'react-native';

import Anim from '../camera/camera_screen';
import HomeScreen from './home/home_screen';
import { IconButton } from 'react-native-paper';
import { Images } from '../../assets/image/image';

import { MainScreensNames } from '../../constants/screen-name';
import { NavigationContext } from '@react-navigation/native';
import UserProfile from './profile/profile';
import { Post } from '../../models/Post';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type mainScreenParamList = {
    [MainScreensNames.home] : {
        post: Post
    },
    [MainScreensNames.search] : undefined,
    [MainScreensNames.postCreate] : undefined,
    [MainScreensNames.reels] : undefined,
    [MainScreensNames.profile] : undefined,
}
const MainTab = createBottomTabNavigator<mainScreenParamList>()

function Empty() {
    return null;
}

export default function MainScreenStack() {
    const navigation = useContext(NavigationContext);

    return (
        <MainTab.Navigator
            initialRouteName={MainScreensNames.home}
            screenOptions={{ headerShown: false, tabBarStyle: { position: 'relative', backgroundColor: Colors.lighter } }}
            detachInactiveScreens={true}
        >
            <MainTab.Screen
                name={MainScreensNames.home}
                component={HomeScreen}
                options={TabOption(Icons.homeFill, Icons.home)}
            />
            <MainTab.Screen
                name={MainScreensNames.search}
                component={Anim}
                options={TabOption(Icons.searchFill, Icons.search)}
            />
            <MainTab.Screen
                name={MainScreensNames.postCreate}
                component={Empty}
                options={{
                    tabBarShowLabel: false,
                    tabBarButton: ((props) => {
                        return (
                            <IconButton
                                {...props}
                                icon={Icons.plus}
                                onPress={() => {
                                    navigation?.navigate('Post');
                                }}
                            />
                        )
                    })
                }}
            />
            <MainTab.Screen
                name={MainScreensNames.reels}
                component={Anim}
                options={TabOption(Icons.reelFill, Icons.reel)}
            />
            <MainTab.Screen
                name={MainScreensNames.profile}
                component={UserProfile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return <Image
                            source={Images.userAvatar}
                            resizeMode='cover'
                            style={{ 
                                width: 26, 
                                height: 26,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor: 'black',
                            }}
                        />
                    }
                }}
            />
        </MainTab.Navigator>
    );
}

const TabOption = (
    iconActive: ImageSourcePropType,
    iconInActive: ImageSourcePropType
): BottomTabNavigationOptions => {
    const background = Colors.light
    return {
        tabBarShowLabel: false,
        // tabBarActiveTintColor: 'red',
        // tabBarInactiveTintColor: 'black',
        tabBarIcon: ({ focused }) => (
            <Image
                source={focused ? iconActive : iconInActive}
                resizeMode='contain'
                style={{ width: 24, height: 24 }}

            />
        )
    }
}