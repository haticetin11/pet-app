import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                {/* <Image style={styles.logo} source={require('../../assets/instagram_logo_name.png')} /> */}
                <View style={styles.textWrapper}>
                        <Text style={styles.logo}>Miavvy</Text>
                    </View>
            </TouchableOpacity>
            <View style={styles.iconContiner}>
                {/* <TouchableOpacity>
                    <Image source={require('../../assets/heart_icon.png')} style={styles.icon} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate('ChatListScreen')}>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>1</Text>
                    </View>
                    <Image source={require('../../assets/facebook_messenger_icon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 16
    },
    iconContiner: {
        flexDirection: 'row'
    },
    textWrapper: {
        color:'black'

    },
    logo: {
        color: 'black',
        fontSize: 24,
        fontWeight: '600'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
        tintColor: 'black',
    },
    unreadBadge: {
        backgroundColor: 'black',
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
        color: 'black',
        fontWeight: '600'
    }
});

export default Header