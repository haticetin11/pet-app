import { View, Text, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.push('LoginScreen')
        }, 4000); 

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <ImageBackground
          source={require('../pictures/bcat.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.container}>
            <View style={styles.upperBox}>
              <Text style={styles.title}>MIAVVVY</Text>
              <Text style={styles.subtitle}>READY TO MAKE A NEW FRIEND</Text>
            </View>
            <View  style={styles.lowerBox}>
              <Text style={styles.getStartedText}>Let's Get Started</Text>
            </View>
            
          </View>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
      image: {
        flex: 1,
        justifyContent: 'center',
        width: null,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      upperBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
        backgroundColor: '#EEE7F5',
        width: '100%',
        height: 100,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
      },
      subtitle: {
        fontSize: 16,
        color: 'black',
      },
      lowerBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#E5D8F0',
        width: '100%',
        height: 60,
        padding: 10,
        borderRadius: 5,
      },
      getStartedText: {
        fontSize: 18,
        color: 'black',
      },
      signInTextContainer: {
        marginTop: 10,
      },
      signInText: {
        fontSize: 16,
        color: 'black', // veya istediğiniz başka bir renk
        textDecorationLine: 'underline', // Altı çizili
        marginTop:10,
        marginBottom:10
        
      },
    });

//     return (
//         <SafeAreaView style={styles.container}>
//             <View></View>
//             <View>
//                 <Image source={require('../pictures/bcat.png')} style={{ width: 90, height: 90 }} />
//             </View>
//             <View style={{
//                 flexDirection: 'column',
//                 alignItems: 'center',
//             }}>
//                 <Text style={{ color: 'gray', fontSize: 16, margin: -30 }}>From</Text>
//                 <Image source={require('../assets/meta_logo.png')} style={styles.metaLogo} />
//             </View>

//         </SafeAreaView>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         flexDirection: 'column',
//         backgroundColor: 'black',
//         justifyContent: 'space-between'
        
//     },
//     metaLogo: {
//         width: 100,
//         height: 80,
//         resizeMode: 'contain',
//         margin: 0
//     }
// });



export default SplashScreen