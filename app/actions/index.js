// export action creators
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as listActions from './listActions';
import * as appActions from './appActions';
import * as authActions from './authActions';

export const ActionCreators = Object.assign(
    {},
    loginActions,
    navigationActions,
    listActions,
    appActions,
    authActions
);
