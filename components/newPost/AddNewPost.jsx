import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Image, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native';
import { getFirestore, getDocs, collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../FirebaseConfig';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from '@firebase/auth';
import BottomTabs, { bottomTabIcons } from '../home/BottomTabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const auth = getAuth(app);

export default function AddNewPost({ navigation }) {
    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const storage = getStorage();
    const [categoryList, setCategoryList] = useState([]);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Category'));
        const categories = querySnapshot.docs.map(doc => doc.data());
        setCategoryList(categories);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmitMethod = async (values) => {
        try {
            const resp = await fetch(image);
            const blob = await resp.blob();
            const storageRef = ref(storage, `communityPost/${Date.now()}.jpeg`);

            await uploadBytes(storageRef, blob);
            const downloadUrl = await getDownloadURL(storageRef);

            await addDoc(collection(db, 'UserPost'), {
                title: values.title,
                desc: values.desc,
                category: values.category,
                image: downloadUrl,
                useremail: userEmail,
                createdAt: new Date()
            });

            console.log("Document added successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                
            >
                <ScrollView>
                    <Text>add new post</Text>
                    <Formik
                        initialValues={{ title: '', desc: '', category: '', useremail: '',createdAt:Date.now() }}
                        onSubmit={onSubmitMethod}
                        validationSchema={Yup.object({
                            title: Yup.string().required('Title is required'),
                            desc: Yup.string().required('Description is required'),
                            category: Yup.string().required('Category is required'),
                        })}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, setFieldValue, errors }) => (
                            <>
                                <View>
                                    <TouchableOpacity onPress={pickImage}>
                                        {image ?
                                            <Image style={styles.addImage} source={{ uri: image }} />
                                            :
                                            <Image style={styles.addImage} source={require('../../assets/add-image.png')} />}
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='title'
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Description'
                                        value={values.desc}
                                        numberOfLines={4}
                                        onChangeText={handleChange('desc')}
                                        onBlur={handleBlur('desc')}
                                    />
                                </View>
                                <View>
                                    <Picker
                                        selectedValue={values.category}
                                        onValueChange={(itemValue) => setFieldValue('category', itemValue)}
                                    >
                                        <Picker.Item label="Select a category" value="" />
                                        {categoryList.map((item, index) => (
                                            <Picker.Item key={index} label={item.name} value={item.name} />
                                        ))}
                                    </Picker>
                                    {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
                                </View>
                                <Pressable style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>SUBMIT</Text>
                                </Pressable>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 80,
        paddingHorizontal: 20,
    },
    input: {
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 10,
        padding: 16,
        color: 'black',
    },
    addImage: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});
