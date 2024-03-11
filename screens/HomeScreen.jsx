import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, {useEffect, useState } from 'react'
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import SafeAreaView from 'react-native-safe-area-view';
import { POSTS } from '../data/posts';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import Icons from '@expo/vector-icons/MaterialIcons'
import { getAuth } from '@firebase/auth';
import {app} from '../FirebaseConfig'
import Slider from '../components/home/Slider';
import { collection, doc, getDoc, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import Categories from '../components/home/Categories';

const auth = getAuth(app);




const HomeScreen = ({ navigation }) => {
  const [ categoryIndex, setCategoryIndex ] = useState(0)
  const db=getFirestore(app);

  const[sliderList,setSliderList]=useState([]);
  const[categoryList,setCategoryList]=useState([]);
  const[latestItemList,setLatestItemList]=useState([]);

  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLatestItemList();
  },[])


  const getSliders= async () =>{
    setSliderList([])
    const querySnapshot=await getDocs(collection(db,"Sliders"));
    querySnapshot.forEach((doc)=>{
      setSliderList(sliderList=>[...sliderList,doc.data()]);
    });
  }
  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, 'Category'));
    const categories = querySnapshot.docs.map(doc => doc.data());
    setCategoryList(categories);
};

  const getLatestItemList=async()=>{
    setLatestItemList([]);
    const querySnapshot= await getDocs(collection(db,'UserPost'),orderBy('createdAd','desc'));
    querySnapshot.forEach((doc)=>{
      console.log("Docs",doc.data);
      setLatestItemList(latestItemList=>[...latestItemList,doc.data()]);
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView >
      <View style={{paddingHorizontal: 16, flexDirection: "row", alignItems: 'center', gap: 8}}>
          <Image source={require('../assets/pawprint.png')}
          style={{width: 52, aspectRatio: 1, borderRadius: 52}}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 6, color: 'black'}} numberOfLines={1}>
              Welcome!
            </Text>
            <Text style={{color: 'slategray', opacity: 0.75}} numberOfLines={1}>
              Let's rescue some pets today!
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginVertical: 24}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
            <Text style={{ fontWeight: '500', fontSize: 24}}>New Rescues</Text>
          </View>
          <Slider sliderList={sliderList}/>
          <Categories categoryList={categoryList}/>
          <Post latestItemList={latestItemList}
          heading={'Latest Paws'}
          />

        </View>
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default HomeScreen

