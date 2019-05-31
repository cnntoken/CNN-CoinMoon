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
import News from './pages';

AppRegistry.registerComponent('stark_others_home', () => News);
