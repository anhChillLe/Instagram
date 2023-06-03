import React, { useContext, useEffect, useState } from "react";
import PostList from "./post_list";
import { ActivityIndicator, Image, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { User, userUrl } from "../../../models/User";
import { Post, postsUrl } from "../../../models/Post";
import { DeviceEventEmitter } from "react-native";
import { IconButton } from "react-native-paper";
import { Icons } from "../../../assets/icons/png/icons";
import { NavigationContext, RouteProp } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { mainScreenParamList } from "../main";
import { MainScreensNames } from "../../../constants/screen-name";

type HomeScreenRoute = RouteProp<mainScreenParamList, MainScreensNames.home>;

export default function HomeScreen({ route }: { route: HomeScreenRoute }) {

    useEffect(() => {
        if (!route.params?.post) return;
        setPostList([route.params?.post, ...posts])
    }, [route.params?.post]);

    const insets = useSafeAreaInsets();

    const [isLoading, setLoading] = useState(true);
    const [isLoadingNew, setLoadingNew] = useState(true);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [friends, setFriendList] = useState<User[]>([]);
    const [posts, setPostList] = useState<Post[]>([]);

    async function getFriendList(url: string) {
        const response = await fetch(url)
        const data = await response.json();
        setFriendList(data);
    }

    async function getPostList(url: string) {
        const response = await fetch(url)
        const data = await response.json();
        setPostList(data);
    }

    async function getData() {
        try {
            await getFriendList(userUrl);
            await getPostList(postsUrl);
        } catch (error) { }
        finally {
            setLoading(false)
            DeviceEventEmitter.emit("onLoaded")
        }
    }

    async function loadMore() {
        try {
            const response = await fetch(postsUrl)
            const data = await response.json();
            const newData = [...posts, ...data];
            setPostList(newData);
        } catch (error) { }
        finally {
            // DeviceEventEmitter.emit("onLoaded")
            setLoadingMore(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
            <Toolbar />
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
                    <ActivityIndicator size={'large'} />
                </View>
            ) : (
                <View style={{ flex: 1 }} >
                    <PostList
                        friends={friends}
                        posts={posts}
                        onEndReached={() => {
                            setLoadingMore(true)
                            loadMore()
                        }}
                        onRefresh={() => {
                            setLoadingNew(true)
                            getData()
                        }}
                    />
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1,
    }
})

function Toolbar() {
    const navigation = useContext(NavigationContext)
    return (
        <View style={toolbarStyle.container}>
            <View style={{ flex: 1, height: 32, justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                <Image style={toolbarStyle.iconInsta} source={Icons.instagramText} />
            </View>
            <IconButton icon={Icons.heart} />
            <IconButton icon={Icons.send} onPress={() => {
                // firebase
                //     .auth()
                //     .signOut()
                //     .then(() => { DeviceEventEmitter.emit("onLogout") })
                //     .catch(error => { console.log(error) })
            }} />
        </View>
    )
}

const toolbarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginVertical: 8,
    },

    iconInsta: {
        height: 36,
        width: 120,
        marginStart: 8,
    },

    icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        marginHorizontal: 8,
    }
})