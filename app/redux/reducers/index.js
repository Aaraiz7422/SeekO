// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import authReducer from '../reducers/authReducers';
import userReducer from '../reducers/userReducers';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  userReducer: userReducer,
});

// Exports
export default rootReducer;
