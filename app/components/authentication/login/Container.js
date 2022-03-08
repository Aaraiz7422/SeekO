import React, { Component, useState, useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import global from '../../../../global-styles';
import {saveAccessToken,setAuthLoading} from '../../../redux/actions/authActions';
import LoginComponent from './Component';
import services from '../../../api/services';
import { urls } from '../../../api/urls';


const LoginContainer = (props) => {

    const [errors, setErrors] = useState(
        {
            email: null,
            password: null,
        }
    );
    const [loading, setLoading] = useState(false);


    const resetErrors = () => {
        let error = errors;
        error.email = null;
        error.password = null;
        setErrors(error);
    };

    const resetSingleFieldError = (field_name) => {
        let error = errors;
        // if(field_name === 'email'){
        //     error[field_name] = errors.email;
        //     error['password'] = errors.password;
        // }
        // if(field_name === 'password'){
        //     error[field_name] = errors.password;
        //     error['email'] = errors.email;
        // }
        error[field_name] = null;
        setErrors(error);
    };

    const loginWithEmail = (login_information) => {
        login_information.grant_type = 'password';
        login_information.client_id = 'cEvWARrIvLZxaJVgvuwtbvVna85sGjkBZeV5o9Jl';
        const { saveAccessTokenAction } = props;
        services
            .base_service(urls.user_login, login_information)
            .then((response) => {
            console.log('response: ', response);
            setLoading(false);
                saveAccessTokenAction(response);
                props.navigation.navigate('App');
            })
            .catch((error) => {
                let err = errors;
                err.email = error.error_description || error.detail;
                err.password =login_information.password.length < 6 ?"Password should be at least 6 characters long": error.error_description || error.detail;
                setErrors(err);
                setLoading(false);
                console.log('login error: ', error);
            });
    }

    const validateSignUpInformation = (login_information) => {
        resetErrors();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let error = errors;
        let is_error = false;
        // if (login_information.password && login_information.password.length < 6) {
        //     error.password = 'Invalid username or password';
        //     is_error = true;
        // }
        // if (login_information.username && !reg.test(login_information.username)) {
        //     error.email = 'Invalid username or password';
        //     is_error = true;
        // }
        if (is_error) {
            setErrors(error);
            setLoading(false);
            return;
        } else {
            loginWithEmail(login_information);
        }
    };

    return (
        <View style={global.page_container}>
            <LoginComponent
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
