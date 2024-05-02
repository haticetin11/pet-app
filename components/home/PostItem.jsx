import { View, Text ,TouchableOpacity,Image,StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function PostItem({item}) {

  const navigation=useNavigation();
  return (
    <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.imageContainer}
            onPress={()=>navigation.push('PostDetail',{
              product:item
            })}
            >
              <Image
                style={styles.image}
                source={{ uri: item.image }}
              />
              <View style={styles.title1Container}>
                <Text style={styles.title1}>paw type: {item.category}</Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.title2}>{item.title}</Text>
              <Text style={styles.title3}>{item.desc}</Text>
            </View>
          </View>

  )
}

const styles = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 6,
    },
    itemContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      height: 300,
      width: 300,
      marginVertical: 10,
    },
    title1Container: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'black',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    title1: {
      color: 'white',
      fontSize: 15,
    },
    title2: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
    },
    title3: {
      fontSize: 15,
      fontWeight: "400",
      marginBottom: 24,
    },
  });