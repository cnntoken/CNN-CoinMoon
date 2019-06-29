import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Index from './Index';
import reducers from '../reducers';
import sagas from '../sagas';
import configureStore from '../configureStore';
import {adaptUserInfo} from "@src/utils";


export default class Page extends Component {


    render() {
        let {baseInfo, params} = this.props;
        let user = adaptUserInfo(baseInfo.currentUser || {});
        const store = configureStore({user}, reducers, sagas);
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        );
    }
}

