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
import PostItem from '../components/home/PostItem'
import Post from '../components/home/Post';
import { collection, doc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';


const auth = getAuth(app);

const Tab = createMaterialTopTabNavigator();
const numberOfCols = 3;

const ProfileScreen = ({ navigation}) => {
    const[name,setName]=useState('')
    const [userEmail, setUserEmail] = useState('');
    const[latestItemList,setLatestItemList]=useState([]);
    const db=getFirestore(app);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setName(user?.displayName ?? " ");
          setUserEmail(user?.email ?? " ");
        });
    
        return unsubscribe;
      }, [auth]);

      useEffect(() => {
        getLatestItemList()
      }, []); 

    
      const getLatestItemList = async () => {
    try {
        const userRef = collection(db, "users"); // Kullanıcı koleksiyonunu referans al
        const userQuery = query(userRef, where('useremail', '==', userEmail)); // Kullanıcıyı email adresine göre sorgula
        const userSnapshot = await getDocs(userQuery); // Kullanıcı sorgusunu gerçekleştir
        if (!userSnapshot.empty) {
            userSnapshot.forEach((userDoc) => {
                const userData = userDoc.data();
                console.log(userData); // userData içeriğini logla
                setName(userData.name); // Kullanıcı adını state'e ayarla
            });
        }
    
        const postRef = collection(db, "UserPost"); // Post koleksiyonunu referans al
        const postQuery = query(postRef, where('useremail', '==', userEmail)); // Kullanıcının postlarını email adresine göre sorgula
        const postSnapshot = await getDocs(postQuery); // Post sorgusunu gerçekleştir
        const postData = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLatestItemList(postData);
        console.log(postData);
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
}

    
    
    

    return (
        <SafeAreaView style={styles.container}>
            <HeaderProfile navigation={navigation} />
            <View style={styles.dashboard}>
                <ProfilePic />
                
                <Text><Bio userEmail={userEmail} /> {/* Bio component'ine userEmail prop'unu geçiyoruz */}</Text>
                <Text style={{ color: 'red', fontWeight: '800', marginLeft: 8 }}>{name}</Text>
            </View>
            <BottomActions navigation={navigation} />
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
            <Divider />
            <Post latestItemList={latestItemList}
          heading={'Post'}
          />
        </SafeAreaView>
    );
}

const Bio = ({ userEmail,name }) => (
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
