import React, {Component} from 'react';
import NavigationService from '@services/NavigationService';
import {
    createStackNavigator,
    createAppContainer,
    // createBottomTabNavigator
} from 'react-navigation';
// 钱包 Wallet
// 资产
import WalletMain from './pages/Main/index';
// 创建
import WalletCreateIndex from './pages/Create/Index/index';
import WalletCreateDone from './pages/Create/Done/index';
import WalletCreateBackup from './pages/Create/Backup/index';
import WalletCreateBackupDone from './pages/Create/BackupDone/index';

// 搜索
import WalletSearch from './pages/Search/index';

// 导入
import WalletImportIndex from './pages/Import/Index/index';
import WalletImportDetail from './pages/Import/Detail/index';
// 交易
import WalletTransactionList from './pages/Transaction/List/index';
import WalletTransactionTransfer from './pages/Transaction/Transfer/index';
import WalletTransactionDetail from './pages/Transaction/Detail/index';


const WalletStack = createStackNavigator({
    // 钱包资产（列表）
    WalletMain: {
        screen: WalletMain,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 创建
    WalletCreateIndex: {
        screen: WalletCreateIndex,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 创建完成，将要进入备份助记词
    WalletCreateDone: {
        screen: WalletCreateDone,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 备份助记词
    WalletCreateBackup: {
        screen: WalletCreateBackup,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 备份助记词完成
    WalletCreateBackupDone: {
        screen: WalletCreateBackupDone,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 搜索页
    WalletSearch: {
        screen: WalletSearch,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 钱包导入（列表）
    WalletImportIndex: {
        screen: WalletImportIndex,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 钱包导入（详情）
    WalletImportDetail: {
        screen: WalletImportDetail,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 钱包交易（列表，记录）
    WalletTransactionList: {
        screen: WalletTransactionList,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 钱包交易（详情）
    WalletTransactionDetail: {
        screen: WalletTransactionDetail,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 钱包交易（转账，发送）
    WalletTransactionTransfer: {
        screen: WalletTransactionTransfer,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
},{
    initialRouteName: 'WalletMain',
    mode: 'modal',
    headerMode: 'none',
})

const Navigation = createAppContainer(WalletStack)

class AppNavigator extends Component {
    render() {
        return (
            <Navigation
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}

export default AppNavigator;
