import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, Touchable, View } from "react-native";
import { User } from "../../../models/User";
import { Post } from "../../../models/Post";
import { Icons } from "../../../assets/icons/png/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import FriendList from "./friend_list";
import { IconButton } from "react-native-paper";
import { NavigationContext, useNavigation } from "@react-navigation/native";

const UserPost = ({ name, avatar }: { name: string, avatar: string }) => {
    return (
        <View style={userStyle.container}>
            <Image style={userStyle.avatar} source={{ uri: avatar }} />
            <Text style={userStyle.name}>{name}</Text>
            <View style={{ flex: 1 }} />
            <Image style={{ height: 20, width: 20, margin: 16, opacity: 0.5 }} source={Icons.more} />
        </View>
    );
};

const Caption = ({ post }: { post: Post }) => {
    const [isLiked, setLike] = useState<boolean>(post.isLiked)
    const [isColapsed, setCollapse] = useState<boolean>(true)

    const navigation = useContext(NavigationContext)

    return (
        <View>
            <View style={commentStyle.container}>
                <IconButton
                    icon={isLiked ? Icons.heartFill : Icons.heart}
                    iconColor={isLiked ? 'red' : 'black'}
                    onPress={() => { setLike(!isLiked) }}
                />
                <IconButton icon={Icons.chat} onPress={() => navigation?.navigate("Comments")}/>
                <IconButton icon={Icons.send} />
                <View style={{ flex: 1 }} />
                <IconButton icon={Icons.bookMark} />
            </View>
            <Text style={{ fontWeight: '900', marginStart: 16, fontSize: 15 }}>{post.like} lượt thích</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => setCollapse(!isColapsed)}>
                <Text style={commentStyle.caption} numberOfLines={isColapsed ? 2 : 10} ellipsizeMode="tail">
                    <Text style={{ fontWeight: '700' }}>{post.name}</Text> {post.caption}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => { navigation?.navigate("Comments") }}>
                <Text style={{ fontSize: 14, marginTop: 8, marginStart: 16 }}>Xem tất cả {post.comment} bình luận</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, marginTop: 6, marginStart: 16 }}>
                {getDays(post.createAt)} ngày trước · Gợi ý cho bạn
            </Text>
        </View>

    )
}

function getDays(number: number) {
    const date = new Date(number);
    const now = new Date();

    const diff = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24))
}

type postListProps = {
    posts: Post[],
    friends: User[],
    onEndReached: () => void,
    onRefresh: () => void
}

export default function PostList({ posts, friends, onEndReached, onRefresh }: postListProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    function RenderPost({ item, index }: { item: Post, index: number }) {
        const isFirst = index === 0;
        const isLast = index === posts.length - 1

        if (isFirst)
            return <FriendList data={friends} />
        else if (isLast)
            return <LoadMoreIndicator />
        else
            return (
                <View style={postStyle.container}>
                    <UserPost name={item.name} avatar={item.avatar} />
                    <Image style={postStyle.image} source={{ uri: item.img }} />
                    <Caption post={item} />
                </View>
            )
    }

    if (posts.length > 0) {
        const empty = posts[0]
        posts = [empty, ...posts, empty]
    }

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={RenderPost}
            onEndReached={onEndReached}

            refreshing={isRefreshing}
            onRefresh={() => {
                setIsRefreshing(true)
                onRefresh()
                setIsRefreshing(false)
            }}

            keyExtractor={(item, index) => String(index)}
        />
    )
}

function LoadMoreIndicator() {
    return (
        <View style={{ marginBottom: 16 }}>
            <ActivityIndicator size={'large'} color='black' />
        </View>
    )
}

const postStyle = StyleSheet.create({
    container: {
        marginBottom: 16,
    },

    image: {
        width: '100%',
        aspectRatio: 1,
    }
})

const commentStyle = StyleSheet.create({
    container: {
        // marginVertical: 16,
        marginHorizontal: 8,
        flexDirection: 'row'
    },

    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginHorizontal: 12,
    },

    caption: {
        marginHorizontal: 16,
        marginTop: 4,
        fontSize: 14
    }
})

const userStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 24,
        margin: 8,
        borderWidth: 0.25,
        borderColor: 'black',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})