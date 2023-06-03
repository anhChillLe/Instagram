import React, { useContext, useState } from 'react'
import { FlatList, Image, ImageURISource, StyleSheet, TextInput, View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { Icons } from '../../assets/icons/png/icons'
import { Comment } from '../../models/Comment'
import { createFakeComments, fakeComments } from '../../models/fake_comments'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContext } from '@react-navigation/native'
import { Images } from '../../assets/image/image'

function Toolbar() {
    const navigation = useContext(NavigationContext)

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8 }}>
            <IconButton icon={Icons.back} onPress={() => { navigation?.goBack() }} />
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Bình luận</Text>
            <View style={{ flex: 1 }} />
            <IconButton icon={Icons.send} />
        </View>
    )
}

function RenderComment({ item, index, setLiked }: { item: Comment, index: number, setLiked: (id: number) => void }) {
    return (
        <View style={styles.commentContainer}>
            <Image source={item.userAvatar} style={styles.avatar} resizeMode='contain' />
            <View style={{ flexDirection: 'column', marginStart: 16, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                    {item.userName}
                    <Text style={{ fontWeight: '600', color: 'gray' }}>   {getDays(item.createdAt)} ngày</Text>
                </Text>
                <Text
                    style={styles.comment}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >{item.comment}</Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: 'gray' }}>Trả lời</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <IconButton
                    icon={item.isLiked ? Icons.heartFill : Icons.heart}
                    size={16}
                    iconColor={item.isLiked ? 'red' : 'gray'}
                    onPress={() => {
                        setLiked(item.id)
                    }}
                />
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'gray' }}>{item.like}</Text>
            </View>
        </View>
    )
}

function getDays(date: Date) {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24))
}

export default function CommentScreen() {
    const [comments, setComments] = useState(createFakeComments(4))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Toolbar />
                <FlatList
                    data={comments}
                    renderItem={({ item, index }) => {
                        return (
                            <RenderComment item={item} index={index} setLiked={(id) => {
                                const data = [...comments]
                                data[index].isLiked =!data[index].isLiked
                                setComments(data)
                            }} />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <WriteComment onCreate={(comment) => {
                setComments([comment, ...comments])
            }} />
        </SafeAreaView>
    )
}

function WriteComment({ onCreate }: { onCreate: (comment: Comment) => void }) {
    const [content, setComment] = useState<string>('')

    return (
        <View>
            <Divider />
            <View style={{ marginVertical: 4, marginHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.userAvatar} style={styles.avatar} resizeMode='contain' />
                <TextInput
                    placeholder='Thêm bình luận...'
                    style={{
                        fontSize: 14,
                        marginStart: 8,
                        flex: 1,
                    }}
                    value={content}
                    onChangeText={(text) => setComment(text)}
                />
                <IconButton
                    icon={Icons.sendHorizontal}
                    size={20}
                    onPress={() => {
                        if (!content) return;
                        const comment: Comment = {
                            id: 0,
                            userName: 'Chill Le',
                            userAvatar: Images.userAvatar,
                            comment: content,
                            createdAt: new Date(),
                            like: 0,
                            isLiked: false,
                        }
                        onCreate(comment)
                        setComment('')
                    }}
                />
            </View>
            <Divider />
        </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    comment: {
        fontWeight: 'normal',
        fontSize: 14,
    }
})