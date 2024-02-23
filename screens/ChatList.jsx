import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import ChatHeader from '../components/chat/chatHeader';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
const ChatListScreen = ({ navigation }) => {
  const chatData = [
    { id: '1', user: 'John Doe', lastMessage: 'Hello there!' },
    { id: '2', user: 'Jane Smith', lastMessage: 'How are you doing?' },
    { id: '3', user: 'Bob Johnson', lastMessage: 'What s up' }
  ];

  const renderChatItem = ({ item }) => (
    <View>
        {/* <ChatHeader/> */}
         <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen')}
    >
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW4lMjBmYWNlfGVufDB8fDB8fHww" }}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <ChatHeader navigation={navigation}/>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
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
});

export default ChatListScreen;