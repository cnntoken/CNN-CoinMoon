/** @format */

if (!__DEV__) {
    console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
        time: () => {
        },
        timeEnd: () => {
        },
    };
}


import {AppRegistry} from 'react-native';

import Disclose from './pages';

AppRegistry.registerComponent('stark_disclose_publish', () => Disclose);

