import {createStore, compose, applyMiddleware,combineReducers} from 'redux';
// redux-persist用于store 持久化
// import {persistStore, persistCombineReducers} from 'redux-persist';
// import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducers from 'app/reducers'; // where reducers is a object of reducers
import sagas from 'app/sagas';

// redux-persist 配置
// const config = {
//     key: 'root',
//     // 存储引擎、 一个 Engine，例如 LocalStorage 和 AsyncStorage
//     storage,
//     // 黑名单数组，可以忽略一些 reducers 中的 key
//     blacklist: ['nav', 'loadingReducer','feedReducer'],
//     debug: true //to get useful logging
// };

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
    middleware.push(createLogger());
}

// const reducers = persistCombineReducers(config, rootReducers);
const reducers = combineReducers(rootReducers);

const enhancers = [applyMiddleware(...middleware)];

// const initialState = {};
// const persistConfig = {enhancers};
const store = createStore(reducers, undefined, compose(...enhancers));

// const persistor = persistStore(store, persistConfig, () => {
//     //   console.log('Test', store.getState());
// });

const configureStore = () => {
    return {store};
};

sagaMiddleware.run(sagas);

export default configureStore;
