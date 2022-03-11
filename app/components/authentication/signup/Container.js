import React, {useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import global from '../../../../global-styles';
import {
  saveAccessToken,
  setAuthLoading,
} from '../../../redux/actions/authActions';
import SignupComponent from './Component';
import services from '../../../api/services';
import {urls} from '../../../api/urls';

const SignupContainer = props => {
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const resetErrors = () => {
    let error = errors;
    error.username = null;
    error.password = null;
    setErrors(error);
  };

  const resetSingleFieldError = field_name => {
    let error = errors;
    error[field_name] = null;
    setErrors(error);
  };
  const signUpWithEmail = sign_up_information => {
    services
      .base_service(urls.user_register, sign_up_information)
      .then(response => {
        console.log('response: ', response);
        let err = errors;
        err.username = response.username;
        err.password = response.password;
        setErrors(err);
        setLoading(false);
        if (
          errors.username !== 'Account already exists. Please try Signing in.'
        ) {
          loginAuth(sign_up_information);
        }
      })
      .catch(error => {
        console.log('Sign-up error: ', error);
      });
  };

  const loginAuth = login_information => {
    login_information.grant_type = 'password';
    login_information.client_id = 'cEvWARrIvLZxaJVgvuwtbvVna85sGjkBZeV5o9Jl';
    const {saveAccessTokenAction} = props;
    services
      .base_service(urls.user_login, login_information)
      .then(response => {
        saveAccessTokenAction(response);
        setLoading(false);
        props.navigation.navigate('App');
      })
      .catch(error => {
        setLoading(false);
        console.log('login error: ', error);
      });
  };

  const validateSignUpInformation = login_information => {
    resetErrors();
    let error = errors;

    if (login_information.username === null) {
      error.username = 'Email field should not be blank';
    }
    if (login_information.password === null) {
      error.password = 'Password field should not be blank';
    }
    if (
      login_information.username !== null &&
      login_information.password !== null
    ) {
      signUpWithEmail(login_information);
    }
  };

  return (
    <View style={global.page_container}>
      <SignupComponent
        navigation={props.navigation}
        validateSignUpInformation={validateSignUpInformation}
        loading={loading}
        setLoading={setLoading}
        resetSingleFieldError={resetSingleFieldError}
        errors={errors}
      />
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    logged_in: state.authReducer.logged_in,
    auth_loading: state.authReducer.auth_loading,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    saveAccessTokenAction: token_response =>
      dispatch(saveAccessToken(token_response)),
    setAuthLoadingAction: loading => dispatch(setAuthLoading(loading)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
