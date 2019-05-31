import {createStore, compose, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
    middleware.push(createLogger());
}
const enhancers = [applyMiddleware(...middleware)];

export default (initialStore, rootReducer, sagas)=>{
    const store =  createStore(rootReducer, initialStore, compose(...enhancers));
    sagaMiddleware.run(sagas);
    return store;
};
