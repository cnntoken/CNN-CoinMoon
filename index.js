/** @format */

// if (!__DEV__) {
//     console = {
//         info: () => {
//         },
//         log: () => {
//         },
//         warn: () => {
//         },
//         error: () => {
//         },
//         time: () => {
//         },
//         timeEnd: () => {
//         },
//     };
// }

import './shim'
import {AppRegistry} from 'react-native';
// import Wallet from './src/Wallet/pages/index'
import Policy from './src/Policy'
import Login from './src/Login'
import Market from './src/Market/index';
import MarketDetail from './src/MarketDetail/index';
import NewsDetail from './src/NewsDetail/pages';
import OthersHome from './src/OthersHome/pages';
import DisclosePublish from './src/DisclosePublish/pages';
import DiscloseDetail from './src/DiscloseDetail/pages';
import Mine from './src/Mine/pages';
import MineEdit from './src/MineEdit/pages';
import MineSetting from './src/MineSetting/pages';


AppRegistry.registerComponent('stark_login', () => Login);
// AppRegistry.registerComponent('stark_wallet', () => Wallet);
AppRegistry.registerComponent('stark_policy', () => Policy);
AppRegistry.registerComponent('stark_market', () => Market);
AppRegistry.registerComponent('stark_market_detail', () => MarketDetail);

AppRegistry.registerComponent('stark_news_detail', () => NewsDetail);
AppRegistry.registerComponent('stark_others_home', () => OthersHome);
AppRegistry.registerComponent('stark_disclose_publish', () => DisclosePublish);
AppRegistry.registerComponent('stark_disclose_detail', () => DiscloseDetail);
AppRegistry.registerComponent('stark_mine_edit', () => MineEdit);
AppRegistry.registerComponent('stark_mine_setting', () => MineSetting);
AppRegistry.registerComponent('stark_mine', () => Mine);

