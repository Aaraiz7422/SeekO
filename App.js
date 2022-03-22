// import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View , StatusBar,Appearance} from 'react-native';
import OnBoardingScreen2 from './app/components/app/OnBoardingScreen2';
import ResetPassword from './app/components/authentication/reset-password/ResetPassword';
import ForgetPassword from './app/components/authentication/forget-password/ForgetPassword';
// import Home from './components/Home';
import { COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from './constants';
import CustomCard from './app/components/global/CustomCard'
import Basic8 from './app/components/app/Basic8';
import StartQuizComponent from './app/components/app/StartQuizComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppContainer from './app/navigators';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store/store';
import axios from 'axios';

import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

//Hello
export default function App() {

  useEffect(()=>{
    SplashScreen.hide();
    axios.interceptors.request.use(function (config) {
      if (
        config.data &&
        config.data.grant_type !== undefined &&
        (config.data.grant_type === 'refresh_token' ||
          config.data.grant_type === 'password')
      ) {
        return config;
      }
      const token = store.getState().authReducer.auth_token;
      if (token !== undefined && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    });
  })

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 ,backgroundColor:"#F5F8FF",marginHorizontal:0,marginBottom:-36,marginTop:-12}}>
          <StatusBar hidden={false} backgroundColor={"#F5F8FF"} barStyle={'dark-content'} ></StatusBar>
          <AppContainer></AppContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85DADA',
    justifyContent: 'flex-end',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  bottomContainer: {
    height: '45%',
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#FFF',
  },
});
