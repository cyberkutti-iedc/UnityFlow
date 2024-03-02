import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './screens/onboarding';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/dashboard';
import Profile from './screens/Profile';
import Insight from './screens/Insight';
import Notification from './screens/Notification';
import PaperReactCommunity from './screens/community';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"  
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"  
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"  
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"  
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Insight"  
          component={Insight}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"  
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaperReactCommunity"  
          component={PaperReactCommunity}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
