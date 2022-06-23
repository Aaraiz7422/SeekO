import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginContainer from '../../components/authentication/login/Container';
import SignupContainer from '../../components/authentication/signup/Container';
import ForgetPassword from '../../components/authentication/forget-password/ForgetPassword';
import ResetPassword from '../../components/authentication/reset-password/ResetPassword';
import OnBoarding from '../../components/onboarding/Container';
import HomeContainer from '../../components/app/home/Container';
import PDFGenerateShareAndSaveDocument from '../../components/app/pdf-generate-and-share/Component';
import { useNavigation } from '@react-navigation/native';

const AuthStack = createStackNavigator();

const AuthenticationStack = () => {

    const navigation = useNavigation();
    const [isFirstLaunch,setIsFirstLaunch] = useState(null);
    useEffect(()=>{
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if(value===null){
                AsyncStorage.setItem('alreadyLaunched','true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    },[]);

    if(isFirstLaunch === null ){
        return null;
    } else if ( isFirstLaunch === true ) {
        return (<AuthStack.Navigator screenOptions={{headerShown:false}}>
        <AuthStack.Screen name="Onboarding" component={OnBoarding} />
        <AuthStack.Screen name="Login" component={LoginContainer} />
        <AuthStack.Screen name="Signup" component={SignupContainer} />
        <AuthStack.Screen name="ForgotPassword" component={ForgetPassword}/>
        <AuthStack.Screen name="ResetPassword" component={ResetPassword}/>
        <AuthStack.Screen name="Pdf" component={PDFGenerateShareAndSaveDocument}/>
    </AuthStack.Navigator>);
    }
     else {

        return (
        <AuthStack.Navigator 
        initialRouteName='Login'
         screenOptions={{headerShown:false}}>
            {/* <AuthStack.Screen name="Onboarding" component={onBoarding} /> */}
            {/* <AuthStack.Screen name='Home' component={HomeContainer} /> */}
            <AuthStack.Screen name="Login" component={LoginContainer} />
            <AuthStack.Screen name="Signup" component={SignupContainer} />
            <AuthStack.Screen name="ForgotPassword" component={ForgetPassword}/>
            <AuthStack.Screen name="ResetPassword" component={ResetPassword}/>
        <AuthStack.Screen name="Pdf" component={PDFGenerateShareAndSaveDocument}/>

        </AuthStack.Navigator>
    );
        // return <LoginContainer ></LoginContainer>
    }

    // return (
    //     <AuthStack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
    //         {/* <AuthStack.Screen name="Onboarding" component={onBoarding} /> */}
    //         <AuthStack.Screen name="Login" component={LoginContainer} />
    //         <AuthStack.Screen name="Signup" component={SignupContainer} />
    //         <AuthStack.Screen name="ForgotPassword" component={ForgetPassword}/>
    //         <AuthStack.Screen name="ResetPassword" component={ResetPassword}/>
    //     </AuthStack.Navigator>
    // );
}

export default AuthenticationStack;
