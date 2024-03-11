import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export const ProfilePic = () => {
    return (
        <View>
            <Image source={require('../../assets/pawprint.png')} style={styles.story} />

            {/* <LinearGradient
                colors={['#000', '#000', '#000']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.storyGradient}>
                <Image source={require('../../assets/pawprint.png')} style={styles.story} />
            </LinearGradient> */}
        </View>
    )
}

const styles = StyleSheet.create({
    storyGradient: {
        height: 82,
        width: 82,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 82 / 2,
        margin: 5,
    },
    story: {
        width: 52,
        height: 52,
        borderRadius: 52,
        alignSelf: 'center',
        borderColor: 'white',
        

    }
})

// export default ProfilePic
// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import firebase from 'react-native-firebase'; // firebase importunu düzelt
// import 'firebase/storage'
// const UploadMediaFile = () => {
//     const [image, setImage] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     // Fotoğraf seçme fonksiyonu
//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });
    
//         if (!result.cancelled) {
//             setImage(result.uri);
//         }
//     };

//     // Firebase'e medya yükleme fonksiyonu
//     const uploadMedia = async () => {
//         if (image) {
//             try {
//                 setUploading(true);

//                 const { uri } = await FileSystem.getInfoAsync(image);
//                 const response = await fetch(uri);
//                 const blob = await response.blob();

//                 const filename = image.substring(image.lastIndexOf('/') + 1);
//                 const ref = firebase.storage().ref().child(filename);

//                 await ref.put(blob);
//                 setUploading(false);
//                 Alert.alert('Photo uploaded successfully!');
//                 setImage(null);
//             } catch (error) {
//                 console.error(error);
//                 setUploading(false);
//                 Alert.alert('An error occurred while uploading the photo.');
//             }
//         } else {
//             Alert.alert('Please select an image to upload.');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={pickImage}>
//                 <Text>Pick an Image</Text>
//             </TouchableOpacity>
//             <View>
//                 {image && <Image source={{ uri: image }} style={styles.image} />}
//                 <TouchableOpacity onPress={uploadMedia}>
//                     <Text>Upload Image</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 300,
//         height: 300,
//         resizeMode: 'cover',
//         marginBottom: 20,
//     },
// });

// export default UploadMediaFile;