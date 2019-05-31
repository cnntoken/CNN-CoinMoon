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
import Wallet from './pages'


AppRegistry.registerComponent('stark_wallet', () => Wallet);
