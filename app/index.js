/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleProvider, Root} from "native-base";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';

import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";


const {persistor, store} = configureStore();

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<ActivityIndicator/>}
                    persistor={persistor}
                >
                    <StyleProvider style={getTheme(variables)}>
                        <Root>
                            <Navigator/>
                        </Root>
                    </StyleProvider>
                </PersistGate>
            </Provider>
        );
    }
}
