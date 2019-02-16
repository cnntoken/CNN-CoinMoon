/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {Component} from 'react';
import {ActivityIndicator,StatusBar} from 'react-native';
import {StyleProvider, Root} from "native-base";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';
import SplashScreen from 'react-native-splash-screen';
import RNLanguages from 'react-native-languages';
import i18n from './i18n';

import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";
import appServices from './services/app';



const {persistor, store} = configureStore();

export default class Index extends Component {
    _onLanguagesChange = ({ language }) => {
        i18n.locale = language;
    };

    componentWillUnmount() {
        RNLanguages.removeEventListener('change', this._onLanguagesChange);
    }

    async componentDidMount(){

        RNLanguages.addEventListener('change', this._onLanguagesChange);
        SplashScreen.hide();
        appServices.prepare(store);

    }
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

