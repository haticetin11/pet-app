import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import { app } from '../FirebaseConfig';
import { getAuth } from '@firebase/auth';
import ChatHeader from '../components/chat/chatHeader';

export default ChatScreen = ({ navigation, route }) => {
  const database = getFirestore(app);
  const auth = getAuth(app);

  const [messages, setMessages] = useState([]);
  const { receiverEmail } = route.params;

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.id, // Access document ID using doc.id
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
        }))
      );
    });

    return unsubscribe;
  }, []);

  const currentUser = auth.currentUser;
  const chatId =
  currentUser.email > receiverEmail
    ? `${currentUser.email}-${receiverEmail}`
    : `${receiverEmail}-${currentUser.email}`;


  
  const onSend = async (msgArray) => {
    const msg = msgArray[0];
    // const currentUser = auth.currentUser;
    const usermsg = {
      ...msg,
      sentBy: currentUser.email,
      sentTo: receiverEmail,
      createdAt: new Date(),
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, usermsg)
    );

   
    try {
      await addDoc(collection(database, `chats/${chatId}/messages`), {
        ...usermsg,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error sending message to Firestore:', error);
    }
  };

  const getAllMessages = async () => {
    try {
      const messagesRef = collection(database, `chats/${chatId}/messages`);
      const q = query(messagesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = onSnapshot(q, snapshot => {
        const allTheMsgs = snapshot.docs.map(docSnap => ({
          _id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt.toDate(),
        }));
        setMessages(allTheMsgs);
      });
      return querySnapshot;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth.currentUser && receiverEmail) {
        getAllMessages(auth.currentUser, receiverEmail);
      }
    }, 500);
  
    return () => clearTimeout(timeout);
  }, [auth.currentUser, receiverEmail]);

  return (
    <>
    <SafeAreaView>
      <ChatHeader navigation={navigation} navigate="ChatListScreen" label={receiverEmail}/>
    </SafeAreaView>
      <GiftedChat 
        style={{ flex: 1 }}
        messages={messages}
        onSend={text => onSend(text)}
        user={{ 
          _id: auth.currentUser.email,
        }}
      />
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#DCF8C6',
//     padding: 8,
//     marginVertical: 4,
//     borderRadius: 8,
//     maxWidth: '70%',
//   },
//   otherMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#EAEAEA',
//     padding: 8,
//     marginVertical: 4,
//     borderRadius: 8,
//     maxWidth: '70%',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 8,
//     marginRight: 8,
//   },
//   sendButton: {
//     backgroundColor: '#4CAF50',
//     padding: 8,
//     borderRadius: 8,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
