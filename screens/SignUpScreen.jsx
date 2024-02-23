import { View, Image,StyleSheet,Text } from 'react-native'
import React from 'react'
import SignUpForm from '../components/signUpScreen/SignUpForm'

const SignUpScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <View style={styles.textWrapper}>
                        <Text style={styles.logo}>Miavvy</Text>
        </View>
        </View>
        <SignUpForm navigation={navigation}/>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12
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

export default SignUpScreen