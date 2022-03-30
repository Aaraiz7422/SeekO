import React, {useEffect} from 'react';

//Import Plugins and Libraries
import Iaphub from 'react-native-iaphub';
//Import Global Components

//Import Local Components
import SubscriptionComponent from './Component';

//Import global variables and constants

//Import Redux components and actions
import {setCurrentUserFetchLoading} from '../../../redux/actions/userActions';
import {connect} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';

//Import Services and APIs
 const SubscriptionContainer = (props) => {

  useEffect(() => {
    //this.fetchActiveProducts();
    getProductsForSale();
  });

const fetchActiveProducts = () => {
    try {
      console.log('fetchActiveProducts');
      const activeProducts = await Iaphub.getActiveProducts();
      console.log('activeProducts: ', activeProducts);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
const getProductsForSale = () => {
    console.log('getProductsForSale 1');
    Iaphub.getProductsForSale()
      .then(response => {
        console.log('getProductsForSale response: ', response);
      })
      .catch(error => {
        console.log('getProductsForSale Error: ', error);
      });
  }
    return <SubscriptionComponent {...props}></SubscriptionComponent>;
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    logged_in: state.authReducer.logged_in,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    setCurrentUserFetchLoadingAction: loading =>
      dispatch(setCurrentUserFetchLoading(loading)),
    getCurrentUserAction: () => dispatch(getCurrentUser()),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
