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

import Mine from './pages';

AppRegistry.registerComponent('stark_mine_edit', () => Mine);

