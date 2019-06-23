/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from '../navigator';
import sagas, { reducers, modal } from '../sagas/index';
import configureStore from '@lib/configureStore';
export default class Index extends Component {
    render() {
        console.log('entry props: ', this.props);
        const { params, rootTag } = this.props;
        const store = configureStore(
            { params, rootTag, ...modal.state },
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
