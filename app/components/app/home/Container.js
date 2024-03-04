
//Import Core Components
import React, {useEffect, useState} from 'react';
//Import Plugins and Libraries
import {ActivityIndicator} from 'react-native-paper';
import Purchases from 'react-native-purchases';
import {connect} from 'react-redux';
//Import Local Components
import HomeComponent from './Component';
import SubscriptionComponent from '../payment/Component';
import SubscriptionContainer from '../payment/Container';
import SingleChildCard from '../SingleChildCard';
//Import Redux components and actions
import {logout} from '../../../redux/actions/authActions';
import {
  getCurrentUser,
  setChildUserAccount,
  setCurrentUserFetchLoading,
} from '../../../redux/actions/userActions';

const HomeContainer = props => {
  const {navigation, current_user} = props;
  const [show_add_child_account_modal, setShowAddChildAccountModal] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [availablePackages, setAvailablePackages] = useState(null); // stores all subscriptions plan
  // const { current_user_fetching,current_user_error,getCurrentUserAction } = props;
  useEffect(() => {
    fetchProducts();
    props.getCurrentUserAction(userId => setUserIdIAP(userId));
    if (current_user !== null) {
      console.log(`Use Effect is Called :`);
    }
  }, []);

  // for iOS
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

  // this function get all the available subscription plans and 
  // store them in availablePackages variable using setAvailablePackages
  const fetchProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log('fetchProducts: ', offerings);
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        // Display packages for sale
        console.log(
          'initializeRevenueCat Offerings availible packages is :',
          offerings.current.availablePackages.length,
        );
        console.log(
          'Current Availible Packages : ',
          offerings.current.availablePackages,
        );
        setAvailablePackages(offerings.current.availablePackages);
      }
    } catch (e) {
      console.log('initializeRevenueCat Error: ', e);
    }
  };

  // this function is used to register new child on Home screen 
  // and trigger when user onclick plus button on Home screen
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

  // this function triggers when user switch from on tab to another and shows respective UI
  const selectedTab = (currentTab, prop) => {
    if (currentTab === 'Home') {
      return current_user == null ? (
        <ActivityIndicator size="large" color="#00CDAC" />
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
        <ActivityIndicator size={'large'} color="#00CDAC"></ActivityIndicator>
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
        <SubscriptionContainer 
        navigation={navigation}
          availablePackages={availablePackages} ></SubscriptionContainer>
        // <SubscriptionComponent
        //   navigation={navigation}
        //   availablePackages={availablePackages}></SubscriptionComponent>
      );
    } else if (currentTab === 'Users') {
      return current_user == null ? (
        <ActivityIndicator size={'large'} color="#00CDAC"></ActivityIndicator>
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
