import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';;
import {createStackNavigator} from '@react-navigation/stack';
import AppContainer from './app/navigators';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './app/redux/store/store';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import Purchases from 'react-native-purchases';
import {RC_GOOGLE_SDK_KEY} from './config';
import { NetworkProvider } from './network-context';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initializeRevenueCat();
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
  });

  const initializeRevenueCat = async () => {
    Purchases.setDebugLogsEnabled(true);
    try {
      // Init iaphub
      console.log('Initializing RC....');
      await Purchases.setup(RC_GOOGLE_SDK_KEY);
      fetchProducts();
      console.log('Initializing RC....');
    } catch (err) {
      console.log('initializeRevenueCat Error: ', err);
    }
  };
  const fetchProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log('fetchProducts: ', offerings);
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        // Display packages for sale
      }
    } catch (e) {
      console.log('initializeRevenueCat Error: ', e);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#F5F8FF',
            marginHorizontal: 0,
            // position:'absolute',
            // top: 40, bottom: 0, left: 0, right: 0, height: '100%', width: '100%',
            // marginBottom: -36,
            marginTop: Platform.OS === 'android' ? -12 : 0,
          }}>
          <StatusBar
            hidden={false}
            backgroundColor={'#F5F8FF'}
            barStyle={'dark-content'}></StatusBar>
          <AppContainer></AppContainer>
        </SafeAreaView>
          </NetworkProvider>
      </PersistGate>
    </Provider>
  );
}
