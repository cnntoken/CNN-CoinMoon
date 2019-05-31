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

import Policy from './index';

AppRegistry.registerComponent('stark_policy', () => Policy);

