// Initial State
const initialState = {
    auth_token: null,
    refresh_token: null,
    is_logged_in: false,
    auth_loading: false,
  };
  
  // Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Login access token
      case 'ACCESS_TOKEN': {
        console.log('Auth Token: ', action.data);
        let is_logged_in = false;
        if (action.data) {
          is_logged_in = true;
        }
        return {
          // State
          ...state,
          auth_token: action.data.access_token,
          refresh_token: action.data.refresh_token,
          is_logged_in: is_logged_in,
        };
      }
      // Auth loading case currently not called in our app
      case 'AUTH_LOADING': {
        return {
          // State
          ...state,
          auth_loading: action.data,
        };
      }

      case 'LOGOUT': {
        return {
          // State
          ...initialState,
        };
      }
      // Default
      default: {
        return state;
      }
    }
  };
  
  // Exports
  export default authReducer;
  