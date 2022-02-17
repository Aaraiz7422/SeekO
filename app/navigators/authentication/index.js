import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginContainer from '../../components/authentication/login/Container';
import SignupContainer from '../../components/authentication/signup/Container';
import ForgetPassword from '../../components/authentication/forget-password/ForgetPassword';
import ResetPassword from '../../components/authentication/reset-password/ResetPassword';

const AuthStack = createStackNavigator();

function AuthenticationStack() {
    return (
        <AuthStack.Navigator initialRouteName={'Signup'} headerMode="none">
            <AuthStack.Screen name="Signup" component={SignupContainer} />
            <AuthStack.Screen name="Login" component={LoginContainer} />
            <AuthStack.Screen name="ForgotPassword" component={ForgetPassword}/>
            <AuthStack.Screen name="ResetPassword" component={ResetPassword}/>
        </AuthStack.Navigator>
    );
}

export default AuthenticationStack;
