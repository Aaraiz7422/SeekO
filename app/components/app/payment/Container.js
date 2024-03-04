import React, {useEffect} from 'react';

//Import Local Components
import SubscriptionComponent from './Component';

//Import Redux components and actions
//Import Redux components and actions
import {logout} from '../../../redux/actions/authActions';
import {connect} from 'react-redux';
import {
  getCurrentUser,
  setChildUserAccount,
  setCurrentUserFetchLoading,
} from '../../../redux/actions/userActions';
import Purchases from 'react-native-purchases';

const SubscriptionContainer = props => {
  const {current_user,getCurrentUserAction } = props;
  useEffect(() => {
    console.log(`Sub Container `);
    getUserInformation();
    getCurrentUserAction();
  },[]);
  const getUserInformation = async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      console.log(`*** Current User Info *** `);
      console.log(`id : ${current_user.id}`);
      console.log(`gender : ${current_user.gender}`);
      console.log(`is root user : ${current_user.is_root_user}`);
      console.log(`name : ${current_user.name}`);
      console.log(`updated at : ${current_user.updated_at}`);
      console.log(`username : ${current_user.username}`);

      console.log(`*** Customer Info *** `);
      console.log(`request date : ${purchaserInfo.requestDate} `);
      console.log(`original App User Id : ${purchaserInfo.originalAppUserId} `);
      console.log(`first seen : ${purchaserInfo.firstSeen} `);
      console.log(`orignal purchase date : ${purchaserInfo.originalPurchaseDate} `);
      console.log(`management url : ${purchaserInfo.managementURL} `);
      console.log(`all purchase dates : ${purchaserInfo.allPurchaseDates['rc_499_m']} `);
      console.log(`all purchase dates : ${purchaserInfo.allPurchaseDates['rc_6000_y']} `);
      console.log(`all purchase product indentifiers : ${purchaserInfo.allPurchasedProductIdentifiers} `);
      console.log(`non subscription transactions  : ${purchaserInfo.nonSubscriptionTransactions} `);
      console.log(`active subscriptions : ${purchaserInfo.activeSubscriptions} `);

      console.log(`
      *** Customer Info with Entitlement Info  *** `);
      console.log(`identifier : ${purchaserInfo.entitlements.active['pro'].identifier}`);
      console.log(`product identifier : ${purchaserInfo.entitlements.active['pro'].productIdentifier}`);
      console.log(`is Active : ${purchaserInfo.entitlements.active['pro'].isActive}`);
      console.log(`will renew : ${purchaserInfo.entitlements.active['pro'].willRenew}`);
      console.log(`period type : ${purchaserInfo.entitlements.active['pro'].periodType}`);
      console.log(`latest purchase date : ${purchaserInfo.entitlements.active['pro'].latestPurchaseDate}`);
      console.log(`original purchase date : ${purchaserInfo.entitlements.active['pro'].originalPurchaseDate}`);
      console.log(`expiration date : ${purchaserInfo.entitlements.active['pro'].expirationDate}`);
      console.log(`store : ${purchaserInfo.entitlements.active['pro'].store}`);
      console.log(`is sandbox : ${purchaserInfo.entitlements.active['pro'].isSandbox}`);
      console.log(`unsubscribe detected at : ${purchaserInfo.entitlements.active['pro'].unsubscribeDetectedAt}`);
      console.log(`billing issue detected at : ${purchaserInfo.entitlements.active['pro'].billingIssueDetectedAt}`);

    } catch (e) {
      console.log(` error : ${e}`)
     // Error fetching purchaser info
    }
  }

  console.log(` current user : ${current_user}`)
  
  return <SubscriptionComponent {...props}></SubscriptionComponent>;
};

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
    getCurrentUserAction: () =>
      dispatch(getCurrentUser()),
    logoutAction: () => dispatch(logout()),
    setChildUserAccountAction: child_account =>
      dispatch(setChildUserAccount(child_account)),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionContainer);
