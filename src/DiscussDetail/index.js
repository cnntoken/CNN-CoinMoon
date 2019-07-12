import Container from './Container'
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import configureStore from '@lib/configureStore';
import sagas from '../sagas/MarketDiscussDetail/index';
import {initialState,createDiscussDetailReducer} from '../reducers/discussDetailReducer';
import {adaptUserInfo} from "@src/utils";



export default class Page extends PureComponent{
    render(){
        let {baseInfo,params} = this.props;
        let user = adaptUserInfo(baseInfo.currentUser || {});
        const store = configureStore({user,discussNativeInfo:params,...initialState}, createDiscussDetailReducer, sagas);
        return (
        <Provider store={store}>
            <Container />
        </Provider>)
    }
}