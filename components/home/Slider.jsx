import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Slider({ sliderList}) {
  const navigation=useNavigation();

  return (
    <View>
      <FlatList
        data={sliderList}
        horizontal={true}
        renderItem={({ item, index }) => (
          
          <View>
            <TouchableOpacity style={styles.imageContainer}
            onPress={()=>navigation.push('PostDetail',{
              product:item
            })}
            >
            <Image
              source={{ uri: item?.image }}
              style={styles.image}
            />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    margin:20,
    borderRadius:20,
    marginRight:3,
    resizeMode:'cover'
  },
});
