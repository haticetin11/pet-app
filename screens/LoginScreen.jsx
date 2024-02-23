import { View, Image, StyleSheet,Text } from 'react-native'
import React from 'react'
import LoginForm from '../components/loginScreen/LoginForm'
import SafeAreaView from 'react-native-safe-area-view';

const LoginScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
           <View style={styles.textWrapper}>
                        <Text style={styles.logo}>Miavvy</Text>
        </View>
        </View>
        <LoginForm navigation={navigation} />
    </SafeAreaView>

)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
        color:'black'
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    textWrapper: {
        color:'black'
    
    },
    logo: {
        color: 'black',
        fontSize: 24,
        fontWeight: '600'
    },
})

export default LoginScreen