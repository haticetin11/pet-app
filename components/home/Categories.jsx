import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Categories({ categoryList }) {

  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categoryList}
        horizontal={true}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen',{category:item.name})}>
            <View style={styles.item}>
              <Text>{item?.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#E1DCDA',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    width:100
  },
});
