import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/Header';
import { Feather } from '@expo/vector-icons'; // Örnek olarak Feather ikon paketini kullanıyoruz
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';

const SearchScreen = ({ navigation }) => {
    const handleSearch = () => {
        // Arama işlemleri burada gerçekleştirilebilir
        console.log('Arama yapılıyor...');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.header}>patili arkadaşını bul.</Text>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="ara.."
                        placeholderTextColor="#888"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Bul</Text>
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
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SearchScreen;
