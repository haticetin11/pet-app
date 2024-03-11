import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { useRoute } from '@react-navigation/native';

export const bottomTabIcons = [
    {
        name: 'Home',
        active: require('../../assets/home-black-1-16.png'),
        inactive: require('../../assets/home-black-1-16.png'),
        route: 'HomeScreen'
    },
    {
        name: 'Search',
        active: require('../../assets/icon-search-2-16.png'),
        inactive: require('../../assets/icon-search-2-16.png'),
        route: 'SearchScreen'
    },
    {
        name: 'Add',
        active: require('../../assets/add-43-16.png'),
        inactive: require('../../assets/add-43-16.png'),
        route: 'NewPostScreen'
    },
    {
        name: 'Messages',
        active: require('../../assets/messages-33-16.png'),
        inactive: require('../../assets/messages-33-16.png'),
        route: 'ChatListScreen'
    },
    {
        name: 'Profile',
        active: "https://img.icons8.com/?size=100&id=23264&format=png",
        route: 'ProfileScreen'
    },
]



const BottomTabs = ({ icons, navigation }) => {
    const [activeTab, setActiveTab] = useState('Home');
    const route = useRoute();

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => {
            setActiveTab(icon.name);
            if (route.name != icon.route) {
                navigation.push(icon.route);
            }
        }}>
            <Image
                source={icon.name === 'Profile' ? { uri: icon.active } : activeTab === icon.name ? icon.active : icon.inactive}
                style={[styles.icon, icon.name === 'Profile' ? styles.profilePic() : null,
                activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null
                ]} />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: '#fff'
    })
});

export default BottomTabs