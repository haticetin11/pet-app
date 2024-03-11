import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import PostItem from './PostItem';

export default function Post({ latestItemList,heading }) {
  return (
    <View>
      <Text style={styles.title}>{heading}</Text>
      <FlatList
        data={latestItemList}
        renderItem={({ item, index }) => (
          <PostItem item={item}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 6,
  },
})