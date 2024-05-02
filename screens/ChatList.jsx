import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import ChatHeader from '../components/chat/chatHeader';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import { collection, doc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import {app} from '../FirebaseConfig'
import { getAuth } from '@firebase/auth';
import { Avatar, List, Divider, FAB, Portal, Dialog, TextInput, Button, Provider as PaperProvider } from 'react-native-paper';

const ChatListScreen = ({ navigation }) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return unsubscribe;
  }, [auth]); // Make sure to include auth in the dependency array

  useEffect(() => {
    if (userEmail) {
      getUsers();
    }
  }, [userEmail]); // Trigger getUsers when userEmail changes

  const getUsers = async () => {
    try {
      const q = query(collection(db, "users"), where('email', '!=', userEmail));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUser(usersData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  
  
  const renderChatItem = ({ item }) => (
    <View key={item.email}>
        {/* <ChatHeader/> */}
         <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>navigation.navigate('ChatScreen', { receiverEmail: item.email })}
    >
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1713528199169-9488eb2d2b79?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.userName}>{item.email}</Text>
        <Text style={styles.lastMessage}>{item.name}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <ChatHeader navigation={navigation}  navigate="HomeScreen" label="Miavvy"/>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
      <PaperProvider>
        <View style={styles.fabContainer}>
          <Portal style={styles.fab}>
            <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
              <Dialog.Title>New chat</Dialog.Title>
              <Dialog.Content>
                <TextInput label="Enter user email" />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
                <Button onPress={() => setIsDialogVisible(false)}>Save</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => setIsDialogVisible(true)}
          />
        </View>
    </PaperProvider>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // Set flexDirection to 'row'
    alignItems: 'center',
    gap: 8
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 75,
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 16,
    color: '#666',
  },
  fabContainer: {
    position: "absolute",
    bottom: 70, // bottom tab bar'ın bir tık üstünde
    alignSelf: "flex-end", // Tam ortasında
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  
});

export default ChatListScreen;