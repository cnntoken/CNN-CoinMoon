
/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
// import configureStore from '../store/configureStore';
// import configureStore from ''
import configureStore from '@lib/configureStore';

import sagas from '../sagas/Market/index';
import {initialState,createMarketReducer} from '../reducers/marketReducer';
import Navigator from './navigator';
import {adaptUserInfo} from '@src/utils/index';
import {
    Text,
    TextInput
} from 'react-native'

TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {defaultProps: false})
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false})

export default class Page extends PureComponent{
    render(){
        let {baseInfo, params = {}} = this.props;
        let user = adaptUserInfo(baseInfo.currentUser || {});
        const store = configureStore({user, params, ...initialState}, createMarketReducer, sagas);
        return (
        <Provider store={store}>
            <Navigator />
        </Provider>)
    }
}
