import services from '../../api/services';

export function saveAccessToken(token_response) {
  return (dispatch) => {
    dispatch({
      type: 'ACCESS_TOKEN',
      data: token_response,
    });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
}

export function setAuthLoading(loading) {
  return (dispatch) => {
    dispatch({
      type: 'AUTH_LOADING',
      data: loading,
    });
  };
}
