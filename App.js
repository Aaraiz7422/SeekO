import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
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

const Stack = createStackNavigator();

//Hello
export default function App() {

  useEffect(()=>{
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
        <SafeAreaView style={{ flex: 1 ,backgroundColor:"#F5F8FF",marginHorizontal:0,marginBottom:-36}}>
          <AppContainer></AppContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
    // <Home></Home>
    // <Comp></Comp>
    // <Basic8></Basic8>
    // <TopicComponent></TopicComponent>
    // <SubTopicComponent></SubTopicComponent>
    // <SubTopicProgressComponent></SubTopicProgressComponent>
    // <StartQuizComponent></StartQuizComponent>
    // <CustomCard 
    //   contentPosition={2}
    //   imagePosition={1}
    //   cardTitle={"Card Title"}
    //   cardPara={"Card content dljjf djfdkj jdjf lj djkdjk dkjfdk jkldfj ldfjlkd jdjl dfjdk kdjflkj Adil jklj djkdj fljkdkljf jkdjfdj dfkjd kjfkd kjdkjf"}
    //   coverImage={'https://picsum.photos/700'}
    //   shadowColor={"#FFFFFF"}
    //   imageMargin={10}
    // ></CustomCard>
    // <LoginComponent></LoginComponent>
    // <SignUp></SignUp>
    // <OnBoardingScreen2></OnBoardingScreen2>
    // <CustomButton></CustomButton>
    // <ForgetPassword></ForgetPassword>

    // <ResetPassword></ResetPassword>
    // <SafeAreaView style={styles.container}>
    // {/* <View> */}
    //     <StatusBar
    //       barStyle="dark-content"
    //       hidden={true}
    //       translucent={true}
    //     />  
    // {/* </View> */}
    //   <View style={styles.bottomContainer}>
    //     <Text style={{ fontSize: 40, marginLeft: 30, marginRight: 30,fontWeight:'700',padding:20,textAlign:'center'}}>Learn While Playing</Text>
    //     <Text style={{ fontSize: 16, marginLeft: 30,marginRight:30, textAlign: 'center', color:'#707A8D'}}>The average company forecasts a growth   178% in revenues for their first year, 100% for second, and 71% for third.</Text>
    //   </View>
    // </SafeAreaView>
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
