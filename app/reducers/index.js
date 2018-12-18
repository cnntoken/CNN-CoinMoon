/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as listReducer from './listReducer';

export default Object.assign(loginReducer, loadingReducer, listReducer);
