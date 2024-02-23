import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { postFooterIcons } from '../../data/posts'
import { LinearGradient } from 'expo-linear-gradient';


const Post = ({ post }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <Caption post={post} />
            </View>

        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center'
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LinearGradient
                colors={['#F2703F', '#E35157', '#CA1D7E']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.storyGradient}>
                <Image source={{ uri: post.profile_picture }} style={styles.story} />
            </LinearGradient>
            <Text style={{ color: 'black', marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
        </View>
        <View>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
        </View>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450 }}>
        <Image
            source={{ uri: post.imageUrl }}
            style={{ height: '100%', resizeMode: 'cover' }} />
    </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity >
        <Image style={imgStyle} source={imgUrl} />
    </TouchableOpacity>
);


const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'black' }}>
            <Text style={{ fontWeight: '800' }}>{post.user}:</Text>
            <Text style={{ fontWeight: '400' }}> {post.caption}</Text>
        </Text>
    </View>
)

const styles = StyleSheet.create({
    storyGradient: {
        height: 38,
        width: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 82 / 2,
        margin: 5,
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 75 / 2,
        alignSelf: 'center',
        borderColor: '#000',
        borderWidth: 2,
    },
    footerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between'
    }
});

export default Post