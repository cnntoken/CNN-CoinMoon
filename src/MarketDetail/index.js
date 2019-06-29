
/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import configureStore from '@lib/configureStore';
import sagas from '../sagas/MarketDetail/index';
import {initialState,createMarketDetailReducer} from '../reducers/marketDetailReducer';
import Navigator from './navigator';
import {adaptUserInfo} from "@src/utils";



export default class Page extends PureComponent{
    render(){
        let {baseInfo,params} = this.props;
        let user = adaptUserInfo(baseInfo.currentUser || {});
        const store = configureStore({user,nativeInfo:params,...initialState}, createMarketDetailReducer, sagas);
        return (
        <Provider store={store}>
            <Navigator />
        </Provider>)
    }
}