import { View, Text, SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/newPost/AddNewPost'
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor: '', flex: 1}}>
            
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewPostScreen