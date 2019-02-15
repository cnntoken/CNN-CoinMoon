/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
// import * as listReducer from './listReducer';
import * as userReducer from './userReducer';
import * as feedReducer from './feedReducer';

export default Object.assign(loginReducer, loadingReducer, userReducer,feedReducer);
