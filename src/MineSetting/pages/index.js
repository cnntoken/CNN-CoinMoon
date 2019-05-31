import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Settings from './Settings';
import reducers from '../reducers';
import sagas from '../sagas';
import configureStore from '../configureStore';
import {adaptUserInfo} from "@src/utils";


export default class Index extends Component {

    render() {
        let {baseInfo, params} = this.props;
        let user = adaptUserInfo(baseInfo.currentUser || {});
        const store = configureStore({user}, reducers, sagas);
        // params = params || {};
        // const initialRoute = params.initialRoute || 'Edit';
        return (
            <Provider store={store}>
                <Settings/>
            </Provider>
        );
    }
}

