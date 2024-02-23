import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/Header';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import { Feather } from '@expo/vector-icons';

const AddScreen = ({ navigation }) => {
    const handleAddPhoto = () => {
        // Fotoğraf ekleme işlemleri burada gerçekleştirilebilir
        console.log('Fotoğraf ekleme ekranı açılıyor...');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.header}>sahiplendirmek istediğiniz hayvanın fotoğrafını ekleyiniz.</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddPhoto}>
                    <Feather name="plus-circle" size={50} color="black" />
                    <Text style={styles.addText}>Fotoğraf Ekle</Text>
                </TouchableOpacity>
            </View>
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop:30
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 10,
        marginTop:20
    },
    addText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddScreen;
