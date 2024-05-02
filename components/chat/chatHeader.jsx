import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ChatHeader = ({navigation, navigate, label}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(`${navigate}`)}>
                <View style={styles.textWrapper}>
                        <Text style={styles.logo}>← {label}</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 24
    },
    iconContiner: {
        flexDirection: 'row'
    },
    textWrapper: {

    },
    logo: {
        color: 'black',
        fontSize: 16,
        // fontWeight: '600'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    unreadBadge: {
        backgroundColor: 'red',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600'
    }
});

export default ChatHeader