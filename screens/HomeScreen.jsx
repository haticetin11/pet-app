import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, {useState} from 'react'
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import SafeAreaView from 'react-native-safe-area-view';
import { POSTS } from '../data/posts';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import Icons from '@expo/vector-icons/MaterialIcons'

const Categories = [
  "Kedi",
  "Köpek",
  "Tavşan",
  "Kaplumbağa",
  "Kuş"
]


const HomeScreen = ({ navigation }) => {
  const [ categoryIndex, setCategoryIndex ] = useState(0)

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView >
      <View style={{paddingHorizontal: 16, flexDirection: "row", alignItems: 'center', gap: 8}}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D"}}
          style={{width: 52, aspectRatio: 1, borderRadius: 52}}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 6, color: 'black'}} numberOfLines={1}>
              Hi, User!
            </Text>
            <Text style={{color: 'slategray', opacity: 0.75}} numberOfLines={1}>
              Let's rescue some pets today!
            </Text>
          </View>

          <TouchableOpacity style={{ width: 52, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 52, borderWidth: 1, borderColor: 'black'}}>
            <Icons name='notifications' size={20} color='black' />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, marginVertical: 24}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
            <Text style={{ fontWeight: '500', fontSize: 24}}>New Rescues</Text>
            <TouchableOpacity>
              <Text>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', height: 124, gap: 12}}>
            <Card/>
            <Card2/>
          </View>
        </View>

        {/* categories */}
        <FlatList 
          data={Categories}
          style={{ marginBottom: 24 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8}}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return(
                <TouchableOpacity 
                  onPress={() => setCategoryIndex(index)}
                  style={{ 
                    backgroundColor: isSelected ? 'black' : 'white',
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                    borderRadius: 100,
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: 'gray',
                    }}>
                  <Text
                    style={{ color: isSelected ? 'white' : 'black', 
                      fontWeight: '600',
                      fontSize: 16,
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  >{item}</Text>
                </TouchableOpacity>
              )
          }}
        ></FlatList>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
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

const Card = () => {
  return (
    <View style={{flex: 1, position: "relative", overflow: 'hidden', borderRadius: 24}}>
      <Image source={{ uri: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D"}} resizeMode='cover' style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}} />
    </View>
    )
}

const Card2 = () => {
  return (
    <View style={{flex: 1, position: "relative", overflow: 'hidden', borderRadius: 24}}>
      <Image source={{ uri: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D"}} resizeMode='cover' style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}} />
    </View>
    )
}