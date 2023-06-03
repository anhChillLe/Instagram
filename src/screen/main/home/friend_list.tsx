import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../../models/User";

function RenderFriend({ item } : { item: User }) {
    return (
        <View style={styles.friendContainer}>
            <Image
                style={styles.avatar}
                source={{ uri: item.avatar }} />
            <Text
                style={styles.name}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
                {item.name}
            </Text>
        </View>
    );
}

function FriendList({ data }: { data: User[] }) {
    return <FlatList
        style={styles.container}
        horizontal={true}
        data={data}
        renderItem={RenderFriend}
        showsHorizontalScrollIndicator={false}
    />
}

export default FriendList;

const styles = StyleSheet.create({
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    name: {
        fontSize: 12,
        fontWeight: "600",
        width: 52,
    },
    friendContainer: {
        marginHorizontal: 8,
        alignItems: 'center'
    },
    container: {
        marginVertical: 8,
        height: 72
    }
});