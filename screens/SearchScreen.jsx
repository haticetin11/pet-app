import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/Header';
import { getFirestore, collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { app } from '../FirebaseConfig';
import Post from '../components/home/Post';
import { SearchBar } from 'react-native-elements';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';


const SearchScreen = ({ navigation }) => {
    const db = getFirestore(app);
    const [productList, setProductList] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        setProductList([]);
        const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => doc.data());
        setProductList(products);
    };

    const handleSearch = async (text) => {
        setSearchText(text);
        setProductList([]);
        const q = query(collection(db, 'UserPost'), where('title', '>=', text), where('title', '<=', text + '\uf8ff'));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => doc.data());
        setProductList(products);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header navigation={navigation} />
            <SearchBar
                placeholder='Search'
                lightTheme={true}
                round={true}
                containerStyle={{ backgroundColor: 'white' }}
                onChangeText={handleSearch}
                value={searchText}
            />
            <FlatList
                data={productList}
                renderItem={({ item, index }) => <Post item={item} key={index} />}
                keyExtractor={(item, index) => index.toString()}
            />
            <Post latestItemList={productList}/>
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default SearchScreen;
