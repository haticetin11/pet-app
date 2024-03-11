import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatHeader from '../components/chat/chatHeader'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import { useRoute } from '@react-navigation/native';
import { app } from '../FirebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Categories from '../components/home/Categories';
import Post from '../components/home/Post';

export default function CategoryScreen({ navigation,route }) {
    const { category } = route.params;
    const {params}=useRoute();
    const db =getFirestore(app)
    const [itemList,setItemList]=useState([]);
    const [loading,setLoading]=useState(false);


    useEffect(()=>{
        params&&getItemListByCategory();
    },[params]);

    const getItemListByCategory= async() => {
        setItemList([]);
        setLoading(true);
        const q= query(collection(db,'UserPost'),where('category','==',params.category));
        const snapshot = await getDocs(q);
        setLoading(false);
        snapshot.forEach(doc=>{
            console.log(doc.data());
            setItemList(itemList=>[...itemList,doc.data()]);
            setLoading(false);
        })
    }

  return (
    <SafeAreaView style={styles.safeArea}>
        {/* <ChatHeader navigation={navigation}/> */}
      <View style={styles.container}>
        <Text style={styles.text}>{category} CategoryScreen</Text>
      </View>
      <View>
        {loading? 
          <ActivityIndicator size={'large'} color={'#3b82fb'} />
          : 
        itemList?.length>0? 
        <Post latestItemList={itemList}
        heading={category}/> : <Text style={styles.title3}>no post found</Text> }
      </View>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingLeft: 20, // Metni 20 birim sağa kaydırır
    paddingTop:30,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  title3:{
    padding:5,
    fontSize:20,
    justifyContent:'center',
    textAlign:'center',
    color:'black',
    marginTop:20

  }
})
