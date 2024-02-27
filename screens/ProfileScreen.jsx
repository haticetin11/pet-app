import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Image, FlatList, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfilePic } from '../components/profile/ProfilePic'; 
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Divider } from 'react-native-elements';
import { userPosts } from '../data/posts';
import HeaderProfile from '../components/profile/HeaderProfile'; 
import ProfileDashboard from '../components/profile/ProfileDashboard'; 
import { getAuth } from '@firebase/auth';
import {app} from '../FirebaseConfig'

const auth = getAuth(app);

const Tab = createMaterialTopTabNavigator();
const numberOfCols = 3;

const ProfileScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderProfile navigation={navigation} />
            <View style={styles.dashboard}>
                <ProfilePic />
                <Text><Bio userEmail={userEmail} /> {/* Bio component'ine userEmail prop'unu geçiyoruz */}</Text>
            </View>
            <BottomActions navigation={navigation} />
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
            <Divider />
            <Tabs />
        </SafeAreaView>
    );
}

const Bio = ({ userEmail }) => (
    <View>
      
          <Text style={{ color: 'black', fontWeight: '800', marginLeft: 8 }}>
            {userEmail}
          </Text>
        
    </View>
  );


const BottomActions = ({navigation}) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
        <Pressable
            style={styles.buttomActionStyle}
            onPress={() => Alert.alert('Simple Button pressed')}>
            <Text style={styles.buttomActionTextStyle}>{'Profili Düzenle'}</Text>
        </Pressable>
        <Pressable
            style={styles.buttomActionStyle}
            onPress={() => navigation.navigate('SplashScreen')}>
            <Text style={styles.buttomActionTextStyle}>{'Çıkış Yap'}</Text>
        </Pressable>
    </View>
);

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.15;

const Posts = () => (
    <FlatList
        style={{ backgroundColor: 'whitesmoke' }}
        data={userPosts}
        keyExtractor={item => item.id}
        numColumns={numberOfCols}
        renderItem={({ item }) => (
            <Image key={item.id} source={{ uri: item.url }} style={{
                flex: 1,
                aspectRatio: 1,
                margin: 1,
            }} />
        )}
    />
)

const Tabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Posts') {
                    iconName = require('../assets/data_grid_icon.png');
                }
                return <Image source={iconName} size={size} color={color} style={{ width: 25, height: 25, tintColor: 'black' }} />;
            },
            tabBarStyle: { backgroundColor: '' },
            tabBarIndicatorStyle: {
                backgroundColor: 'black',
                height: 1,
            },
            tabBarLabel: () => null,
        })}
    >
        <Tab.Screen name="Posts" component={Posts} />
    </Tab.Navigator>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    dashboard: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    buttomActionStyle: {
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        margin: 3,
        padding: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttomActionTextStyle: {
        color: 'black',
        fontWeight: '600',
        marginLeft: 46,
        marginRight: 46
    },
});

export default ProfileScreen;
