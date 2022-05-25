// Initial State
const initialState = {
    current_user_fetching: false,
    current_user_error: false,
    current_user: null,
    child_user_account: null,
    selected_topic: null,
  };
  
  // Reducers (Modifies The State And Returns A New State)
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      // getting currently Logged in user info
      case 'GET_CURRENT_USER': {
        console.log('current user: dd :', action.data);
        return {
          // State
          ...state,
          current_user: action.data,
          current_user_fetching: false,
          current_user_error: false,
        };
      }

      // storing current user info
      case 'CURRENT_USER_FETCHING': {
        return {
          ...state,
          current_user_fetching: action.data,
        };
      }
      // triggers when there isn't any child
      case 'CURRENT_USER_ERROR': {
        return {
          ...state,
          current_user_error: action.data,
        };
      }

      // create child account
      case 'SET_CHILD_ACCOUNT': {
        return {
          ...state,
          child_user_account: action.data,
        };
      }

      // assigning selected topic detail
      case 'SET_SELECTED_TOPIC': {
        console.log('SET_SELECTED_TOPIC: ', action.data);
        return {
          ...state,
          selected_topic: action.data,
        };
      }
      // Default
      default: {
        return state;
      }
    }
  };
  
  // Exports
  export default userReducer;
  