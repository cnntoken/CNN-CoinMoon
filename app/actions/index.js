// export action creators
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as listActions from './listActions';

export const ActionCreators = Object.assign(
    {},
    loginActions,
    navigationActions,
    listActions,
);
