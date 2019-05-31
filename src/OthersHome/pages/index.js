/**
 * React Native App
 * Everthing starts from the entrypoint
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import OthersHome from './OthersHome';
import reducers from '../reducers';
import sagas from '../sagas';
import configureStore from '../configureStore';
import {adaptUserInfo} from '@utils';

export default class Index extends Component {

    render() {

        let {baseInfo, params} = this.props;
        let user = adaptUserInfo(baseInfo.currentUser || {});
        const store = configureStore({user}, reducers, sagas);
        const initialRoute = params.initialRoute;
        // console.log(params.user);
        return (
            <Provider store={store}>
                <OthersHome initialRoute={initialRoute} userInfo={params.user}/>
            </Provider>
        );
    }
}

