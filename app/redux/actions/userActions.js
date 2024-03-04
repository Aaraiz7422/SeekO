//Import Services and APIs
import services from '../../api/services';
import {urls} from '../../api/urls';

// used to get current parent user info ( currently logged in user info )
export function getCurrentUser() {
  return (dispatch) => {
    dispatch({
      type: 'CURRENT_USER_FETCHING',
      data: true,
    });
    services
      .base_service(urls.get_current_user)
      .then((response) => {
        dispatch({
          type: 'GET_CURRENT_USER',
          data: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: 'CURRENT_USER_FETCHING',
          data: false,
        });
        dispatch({
          type: 'CURRENT_USER_ERROR',
          data: true,
        });
        console.log('error: ', error);
      });
  };
}

// this function is used create child account in parent account
export function setChildUserAccount(child_account) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CHILD_ACCOUNT',
      data: child_account,
    });
  };
}

// gets currently selected topic detail using this function
export function setSelectedTopic(selected_topic) {
  console.log('UA Redux setSelectedTopic: ', selected_topic);
  return (dispatch) => {
    dispatch({
      type: 'SET_SELECTED_TOPIC',
      data: selected_topic,
    });
  };
}

export function setCurrentUserFetchLoading(value) {
  return (dispatch) => {
    dispatch({
      type: 'CURRENT_USER_FETCHING',
      data: value,
    });
  };
}
