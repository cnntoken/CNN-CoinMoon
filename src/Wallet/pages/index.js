/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from '../navigator';
import sagas, { reducers, modal } from '../sagas/index';
import configureStore from '@lib/configureStore';
import { adaptUserInfo } from '@utils/index';
export default class Index extends Component {
    render() {
        console.log('entry props: ', this.props);
        const { baseInfo, params, rootTag } = this.props;
        const user = adaptUserInfo(baseInfo.currentUser || {});
        // 判断用户时是否已导入钱包
        user.wallet = 0; // 表示没有初次，无钱包
        // user.wallet = 1 // 表示仅仅导入了一种钱包
        // user.wallet = 2 // 表示已导入两种及以上钱包
        const store = configureStore(
            { user, params, rootTag, ...modal.state },
            reducers,
            sagas,
        );
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
