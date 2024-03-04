//Import Core Components
import React, {Component, useEffect, useState, useContext} from 'react';
import {View, Text, Platform, Dimensions} from 'react-native';
//Import Plugins and Libraries
import {ActivityIndicator} from 'react-native-paper';
//Import Redux components and actions
import {saveAccessToken, setAuthLoading} from '../../redux/actions/authActions';
import {getCurrentUser} from '../../redux/actions/userActions';
import {connect} from 'react-redux';
//Import Services and APIs
import services from '../../api/services';
import {urls} from '../../api/urls';
//Import Global Components
import CachedImage from '../global/cached-image';
import ConnectionModal from '../global/ConnectionModal';
import {NetworkContext} from '../../../network-context';
//Import global variables and constants
import {APP_NAME, SCREEN_WIDTH} from '../../../constants';

//TODO: This screen deisgn and logi is temporary.
const SplashScreen = props => {
  const [loading, setLoading] = useState(true);
  const internetAvailability = useContext(NetworkContext);

  useEffect(() => {
    const {navigation, auth_token} = props;
    if (auth_token) {
      authenticateAuthToken();
    } else {
      navigation.navigate('Authentication');
    }
  }, []);

  const authenticateAuthToken = () => {
    const {saveAccessTokenAction, refresh_token, navigation} = props;
    let auth_data = {
      grant_type: 'refresh_token',
      client_id: 'cEvWARrIvLZxaJVgvuwtbvVna85sGjkBZeV5o9Jl',
      refresh_token: refresh_token,
    };
    services
      .base_service(urls.user_login, auth_data)
      .then(response => {
        saveAccessTokenAction(response);
        navigation.navigate('App');
      })
      .catch(error => {
        navigation.navigate('Signup');
        console.log('login error: ', error);
      });
  };

  const showLoaderWhileValidatingUser = () => {
    setTimeout(() => setLoading(false), 1000);
    return (
      <ActivityIndicator
        style={loading ? {display: 'flex'} : {display: 'none'}}
        animating={true}
        color="#00CDAC"
        size={'large'}
      />
    );
  };

  return (
    <>
      {internetAvailability.isConnected ? (
        <>
          {Platform.OS === 'android' && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: SCREEN_WIDTH,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: '#F5F8FF',
              }}>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.3,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'purple',
                }}>
                <CachedImage
                  style={{
                    width: SCREEN_WIDTH * 0.9,
                    height: SCREEN_WIDTH * 0.4,
                    borderRadius: SCREEN_WIDTH,
                    marginBottom: 24,
                  }}
                  localImage={true}
                  source={require('../../assets/SEEKO_LOGO.png')}
                />
                {
                  loading && showLoaderWhileValidatingUser()
                  // <Text
                  //   style={{
                  //     color: '#000',
                  //     fontSize: 36,
                  //     fontFamily: 'Poppins-Regular',
                  //   }}>
                  //   {APP_NAME}
                  // </Text>
                }
              </View>
            </View>
          )}
        </>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </>
  );
};

// Exports
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    is_logged_in: state.authReducer.is_logged_in,
    auth_token: state.authReducer.auth_token,
    refresh_token: state.authReducer.refresh_token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    saveAccessTokenAction: token_response =>
      dispatch(saveAccessToken(token_response)),
    setAuthLoadingAction: loading => dispatch(setAuthLoading(loading)),
    getCurrentUserAction: () => dispatch(getCurrentUser()),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
