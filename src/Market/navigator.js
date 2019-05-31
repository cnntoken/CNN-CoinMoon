import React, {Component} from 'react';
import NavigationService from '@services/NavigationService';
import {
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import MarketIndex from './List'
import MarketSearch from './Search'

const MarketStack = createStackNavigator({
    // 行情主页
    MarketIndex: {
        screen: MarketIndex,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    // 搜索页
    MarketSearch: {
        screen: MarketSearch,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    }
},{
    initialRouteName: 'MarketIndex',
    mode: 'modal',
    headerMode: 'none',
})

const Navigation = createAppContainer(MarketStack)

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
