import services from '../../api/services';


// used to save access token for api calls etc.
export function saveAccessToken(token_response) {
  return (dispatch) => {
    dispatch({
      type: 'ACCESS_TOKEN',
      data: token_response,
    });
  };
}

// used to logout from our app
export function logout() {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
}

// this function currently not used in our app
export function setAuthLoading(loading) {
  return (dispatch) => {
    dispatch({
      type: 'AUTH_LOADING',
      data: loading,
    });
  };
}
