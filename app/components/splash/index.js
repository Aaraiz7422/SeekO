import React, {Component, useEffect} from 'react';
import {View,Text} from 'react-native';
import global from '../../../global-styles';
import {saveAccessToken, setAuthLoading} from '../../redux/actions/authActions';
import {getCurrentUser} from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import services from '../../api/services';
import { urls } from '../../api/urls';
import CachedImage from '../global/cached-image';
import { APP_NAME, SCREEN_WIDTH } from '../../../constants';
//TODO: This screen deisgn and logi is temporary.
const SplashScreen = (props) => {

    useEffect(()=>{
        const {navigation, auth_token} = props;
        if (auth_token) {
          authenticateAuthToken();
        } else {
          navigation.navigate('Authentication');
        }
    },[]);

  const authenticateAuthToken = () => {
    const {saveAccessTokenAction, refresh_token, navigation} = props;
    let auth_data = {
      grant_type: 'refresh_token',
      client_id: 'cEvWARrIvLZxaJVgvuwtbvVna85sGjkBZeV5o9Jl',
      refresh_token: refresh_token,
    };
    services
      .base_service(urls.user_login, auth_data)
      .then((response) => {
        saveAccessTokenAction(response);
        navigation.navigate('App');
      })
      .catch((error) => {
        navigation.navigate('Signup');
        console.log('login error: ', error);
      });
  }

    return (
      <View style={global.page_container}>
        <CachedImage
          style={{
            width: SCREEN_WIDTH * 0.4,
            height: SCREEN_WIDTH * 0.4,
            borderRadius: SCREEN_WIDTH,
            marginBottom: 24,
          }}
          localImage={true}
          source={require('../../assets/Logo.png')} />
        <Text style={{color: '#000'}}>
          {APP_NAME}
        </Text>
      </View>
    );
}

// Exports
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    is_logged_in: state.authReducer.is_logged_in,
    auth_token: state.authReducer.auth_token,
    refresh_token: state.authReducer.refresh_token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    saveAccessTokenAction: (token_response) =>
      dispatch(saveAccessToken(token_response)),
    setAuthLoadingAction: (loading) => dispatch(setAuthLoading(loading)),
    getCurrentUserAction: () => dispatch(getCurrentUser()),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
