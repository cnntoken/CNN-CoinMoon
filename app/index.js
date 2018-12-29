/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleProvider, Root,Text} from "native-base";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';
import SplashScreen from 'react-native-splash-screen'


import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";
import appServices from './services/app'

const {persistor, store} = configureStore();
appServices(store)
export default class Index extends Component {
    componentDidMount(){
        SplashScreen.hide()  
    }
    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<ActivityIndicator/>}
                    // loading={null}
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

