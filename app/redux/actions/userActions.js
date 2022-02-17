import services from '../../api/services';
import {urls} from '../../api/urls';
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
export function setChildUserAccount(child_account) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CHILD_ACCOUNT',
      data: child_account,
    });
  };
}
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
