import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import HomeComponent from './Component';
import SubscriptionComponent from '../payment/SubscriptionComponent';
import SingleChildCard from '../SingleChildCard';
import UserComponent from '../users/Component';
import {connect} from 'react-redux';
import {logout} from '../../../redux/actions/authActions';
import {
  getCurrentUser,
  setChildUserAccount,
  setCurrentUserFetchLoading,
} from '../../../redux/actions/userActions';
import {ActivityIndicator} from 'react-native-paper';
import TrackProgressContainer from '../track-progress/Container';

const HomeContainer = props => {
  const {navigation, current_user} = props;
  const [show_add_child_account_modal, setShowAddChildAccountModal] =
    useState(false);
  const [loading, setLoading] = useState(true);
  // const { current_user_fetching,current_user_error,getCurrentUserAction } = props;
  useEffect(() => {
    props.getCurrentUserAction(userId => setUserIdIAP(userId));
    if (current_user !== null) {
      console.log(
        `Use Effect is Called :`,
      );
    }
  }, []);

  const setUserIdIAP = async userId => {
    console.log('setUserIdIAP: ', userId);
    setUserId(userId);
  };

  const setUserId = async userId => {
    try {
      console.log('setUserId: ', userId);
    } catch (error) {
      console.log('setUserId error: ', error);
    }
  };

  const registerNewChild = child_information => {
    const {getCurrentUserAction, setCurrentUserFetchLoadingAction} = props;
    services
      .base_service(urls.user_register, child_information)
      .then(response => {
        getCurrentUserAction();
        showAddChildAccountModal(false);
        console.log('response: ', response);
      })
      .catch(error => {
        console.log('Sign-up error: ', error);
        setCurrentUserFetchLoadingAction(false);
      });
  };

  const showAddChildAccountModal = show_add_child_account_modal => {
    setShowAddChildAccountModal(show_add_child_account_modal);
  };

  const onLogout = () => {
    props.logoutAction();
    navigation.navigate('Authentication');
  };

  const selectedTab = (currentTab, prop) => {
    if (currentTab === 'Home') {
      return current_user == null ? (
        <ActivityIndicator size="large" />
      ) : (
        <SingleChildCard
          {...prop}
          trackProgress={false}
          navigation={navigation}
          current_user={current_user}
          showAddChildAccountModal={showAddChildAccountModal}
          registerNewChild={registerNewChild}
          id={1}></SingleChildCard>
      );
    } else if (currentTab === 'Track Progress') {
      return current_user == null ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <SingleChildCard
          {...prop}
          trackProgress={true}
          navigation={navigation}
          current_user={current_user}
          showAddChildAccountModal={showAddChildAccountModal}
          registerNewChild={registerNewChild}
          id={2}></SingleChildCard>
      );
    } else if (currentTab === 'Subscription') {
      return (
        <SubscriptionComponent navigation={navigation}></SubscriptionComponent>
      );
    } else if (currentTab === 'Users') {
      return current_user == null ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <SingleChildCard
          {...prop}
          navigation={navigation}
          current_user={current_user}
          showAddChildAccountModal={showAddChildAccountModal}
          registerNewChild={registerNewChild}
          id={3}></SingleChildCard>
      );

      // return <UserComponent navigation={navigation}></UserComponent>;
    }
  };

  return (
    <HomeComponent
      {...props}
      navigation={navigation}
      selectedTab={selectedTab}
      showAddChildAccountModal={showAddChildAccountModal}
      registerNewChild={registerNewChild}
      onLogout={onLogout}></HomeComponent>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    logged_in: state.authReducer.logged_in,
    auth_token: state.authReducer.auth_token,
    current_user_fetching: state.userReducer.current_user_fetching,
    current_user: state.userReducer.current_user,
    current_user_error: state.userReducer.current_user_error,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    setCurrentUserFetchLoadingAction: loading =>
      dispatch(setCurrentUserFetchLoading(loading)),
    getCurrentUserAction: setUserId =>
      dispatch(getCurrentUser(userId => setUserId(userId))),
    logoutAction: () => dispatch(logout()),
    setChildUserAccountAction: child_account =>
      dispatch(setChildUserAccount(child_account)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
