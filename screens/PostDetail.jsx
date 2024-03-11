import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import { Ionicons } from '@expo/vector-icons';

export default function PostDetail({navigation}) {
    const { params } = useRoute();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        params&&setProduct(params.product);
        
    }, [params,navigation])

    

    const shareProduct= async() =>{
        const content={
            message:product?.title+"\n"+product?.desc,
        }
        Share.share(content).then(resp=>{
            console.log(resp);
        },(error)=>{
            console.log(error);
        })
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity onPress={shareProduct} style={styles.shareButton}>
                <Ionicons name='share-social-sharp' size={24} color='black' />
            </TouchableOpacity>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{product?.title}</Text>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{product.category}</Text>
                </View>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.description}>{product?.desc}</Text>
            </View>
            <View style={styles.userinfoContainer}>
                <Text style={styles.userinfo}>{product.useremail}</Text>
            </View>
            <TouchableOpacity style={styles.userinfoContainer}>
                <Text style={styles.userinfo}>send message</Text>
            </TouchableOpacity>
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        flexGrow: 1,
        paddingVertical: 20,
    },
    image: {
        height: 200,
        width: 200,
        marginBottom: 15,
        padding:150,
        borderRadius:5,
        marginTop:20,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryContainer: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginBottom: 10,
    },
    category: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
    },
    userinfoContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        borderColor: 'gray',
        borderWidth: 1,
    },
    userinfo: {
        fontSize: 16,
    },
    shareButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        padding:3,
        borderRadius: 8,
    },
})
