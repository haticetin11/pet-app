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
                {/* <Text style={styles.label}>Description:</Text>  */}
                {/* <Text style={styles.userinfo}>{product.useremail}</Text> */}
                <Text style={styles.description}><Text style={styles.userinfo}>{product.useremail}:</Text>{" "}{product?.title}{" "}</Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.categoryTitle}>Description: </Text>
            <Text style={styles.category}>𐙚{product?.desc}</Text>
            <Text style={styles.category}>𐙚{product.category}</Text>
                {/* <View style={styles.categoryContainer}>
                </View> */}
            </View>
            <View style={styles.buttonContainer}>
            {/* <View style={styles.userinfoContainer}>
                <Text style={styles.userinfo}>{product.useremail}</Text>
            </View> */}
            <TouchableOpacity >
                <Text style={styles.buttonSend}>Send Message</Text>
            </TouchableOpacity>
            </View>
            
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
        marginBottom: 16,
        padding:156,
        borderRadius:4,
        marginTop:24,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#333'
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
        fontWeight: '500',
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginRight: 8
    },
    infoContainer: {
        flexDirection: 'col',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 8,
        marginTop: 16
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4
    },
    userinfoContainer: {
        backgroundColor: '#111',
        color: 'gray',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 4,
        marginTop: 20,
        borderColor: '#111',
        borderWidth: 1,
    },
    userinfo: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        paddingRight: 8
    },
    shareButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        padding:4,
        borderRadius: 8,
    },
    buttonSend:{
        backgroundColor: '#E1DCDA',
        padding: 10,
        margin: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        width:150
    }
})
