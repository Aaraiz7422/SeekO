import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './authentication';
import AppNavigationStack from './app';
import SplashScreen from '../components/splash';

const SplashAuth = createStackNavigator();
function SplashScreenStack() {
  return (
    <SplashAuth.Navigator headerMode="none">
      <SplashAuth.Screen name="AuthLoad" component={SplashScreen} />
    </SplashAuth.Navigator>
  );
}
const AppStack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="AuthLoading" headerMode="none" >
        <AppStack.Screen name="AuthLoading" component={SplashScreenStack} />
        <AppStack.Screen name="Authentication" component={AuthenticationStack} />
        <AppStack.Screen name="App" component={AppNavigationStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
