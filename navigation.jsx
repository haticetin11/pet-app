import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import SplashScreen from './screens/SplashScreen'
import ProfileScreen from './screens/ProfileScreen'
import ChatListScreen from './screens/ChatList'
import ChatScreen from './screens/Chat'
import SearchScreen from './screens/SearchScreen'
import CategoryScreen from './screens/CategoryScreen'
import PostDetail from './screens/PostDetail'


const Stack = createStackNavigator();

const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{ headerShown: false}}
            >
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='ChatListScreen' component={ChatListScreen}/>
            <Stack.Screen name='ChatScreen' component={ChatScreen}/>
            <Stack.Screen name='SearchScreen' component={SearchScreen}/>
            <Stack.Screen name='CategoryScreen' component={CategoryScreen}
            options={({route})=>({title: route.params.category})}
            screenOptions={{ headerShown: true}}
            />
            <Stack.Screen name='PostDetail' component={PostDetail}
            options={{headerStyle:{backgroundColor:'#3b82f6'},
        }}
            screenOptions={{ headerShown: true}}
            />
            
            
        </Stack.Navigator>
    </NavigationContainer>
)

export default SignedInStack