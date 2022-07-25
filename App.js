import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
import Home from './screens/Home';
import Login from './screens/Login';
import AWView from './screens/WebView';
import Profile from './screens/Profile';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
          <Stack.Screen name='AWView' component={AWView} options={{headerShown: false}} />
          <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

