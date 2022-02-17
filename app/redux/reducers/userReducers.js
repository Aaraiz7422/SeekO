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
      // Login
      case 'GET_CURRENT_USER': {
        console.log('current user: ', action.data);
        return {
          // State
          ...state,
          current_user: action.data,
          current_user_fetching: false,
          current_user_error: false,
        };
      }
      case 'CURRENT_USER_FETCHING': {
        return {
          ...state,
          current_user_fetching: action.data,
        };
      }
      case 'CURRENT_USER_ERROR': {
        return {
          ...state,
          current_user_error: action.data,
        };
      }
      case 'SET_CHILD_ACCOUNT': {
        return {
          ...state,
          child_user_account: action.data,
        };
      }
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
  