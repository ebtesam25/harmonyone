import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import Fitbit from './src/screens/fitbit';
import Github from './src/screens/github';
import Home from './src/screens/home';
import Register from './src/screens/register';
import Wallet from './src/screens/wallet';
import Qr from './src/screens/qr';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Github" 
        component={Github} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Fitbit" 
        component={Fitbit} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Wallet" 
        component={Wallet} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Qr" 
        component={Qr} 
        options={{ headerShown: false}} 
      />
      
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('app', () => App);
