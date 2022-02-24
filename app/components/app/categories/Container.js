import React, { useState,useEffect } from 'react';
import CategoriesComponent from './Component';
import { fetchCategories } from '../../../../global-functions';

//Import Redux components and actions
import {setCurrentUserFetchLoading} from '../../../redux/actions/userActions';
import {connect} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';

const CategoriesContainer = (props) => {
    const { navigation,route } = props;
    const [categories, setCategories] = useState([]);
    const {account} = route.params;

    useEffect(() => {
        fetchCategories(setCategories);
    }, []);

    return (
        <CategoriesComponent {...props} navigation={navigation} account={account} categories={categories}></CategoriesComponent>
    );
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      logged_in: state.authReducer.logged_in,
      auth_token: state.authReducer.auth_token,
      current_user_fetching: state.userReducer.current_user_fetching,
      current_user: state.userReducer.current_user,
      current_user_error: state.userReducer.current_user_error,
      child_user_account: state.userReducer.child_user_account,
    };
  };
  
  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = (dispatch) => {
    // Action
    return {
      setCurrentUserFetchLoadingAction: (loading) =>
        dispatch(setCurrentUserFetchLoading(loading)),
      getCurrentUserAction: () => dispatch(getCurrentUser()),
    };
  };
  
  // Exports
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CategoriesContainer);