import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import global from '../../../../global-styles';
import {saveAccessToken,setAuthLoading} from '../../../redux/actions/authActions';
import SignupComponent from './Component';
import services from '../../../api/services';
import { urls } from '../../../api/urls';


const SignupContainer = (props) => {

    const [errors, setErrors] = useState(
        {
            username: null,
            password: null,
        }
    );
    const [loading, setLoading] = useState(false);


    const resetErrors = () => {
        let error = errors;
        error.username = null;
        error.password = null;
        setErrors(error);
    };

    const resetSingleFieldError = (field_name) => {
        let error = errors;
        error[field_name] = null;
        setErrors(error);
    };
    const signUpWithEmail = (sign_up_information) => {
        services
          .base_service(urls.user_register, sign_up_information)
          .then((response) => {
            console.log('response: ', response);
            loginAuth(sign_up_information);
          })
          .catch((error) => {
            console.log('Sign-up error: ', error);
            let err = errors;
            err.username = error.username === undefined ?"This field may not be blank":error.username;
            err.password = error.password;
            setErrors(err);
            setLoading(false);
          });
      };
    
    const loginAuth = (login_information) => {
        login_information.grant_type = 'password';
        login_information.client_id = 'cEvWARrIvLZxaJVgvuwtbvVna85sGjkBZeV5o9Jl';
        const { saveAccessTokenAction } = props;
        services
            .base_service(urls.user_login, login_information)
            .then((response) => {
                saveAccessTokenAction(response);
                setLoading(false);
                props.navigation.navigate('App');
            })
            .catch((error) => {
                setLoading(false);
                console.log('login error: ', error);
            });
    }

    const validateSignUpInformation = (login_information) => {
        resetErrors();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let error = errors;
        let is_error = false;
        if (login_information.password && login_information.password.length < 6) {
            error.password = 'Min. 6 characters are required.';
            is_error = true;
        }
        if (login_information.username && !reg.test(login_information.username)) {
            error.username = 'Enter a valid email address.';
            is_error = true;
        }
        // if ( login_information.username === null){
        //     error.username = "This field may not be blank"
        // }
        if (is_error) {
            setErrors(error);
            setLoading(false);
        } else {
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
}


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        logged_in: state.authReducer.logged_in,
        auth_loading: state.authReducer.auth_loading,
    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        saveAccessTokenAction: (token_response) =>
            dispatch(saveAccessToken(token_response)),
        setAuthLoadingAction: (loading) => dispatch(setAuthLoading(loading)),
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
