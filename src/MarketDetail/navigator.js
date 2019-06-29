import React, {Component} from 'react';
import NavigationService from '@services/NavigationService';
import {
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import MarketDetail from './Detail'
// import DiscussDetail from './DiscussDetail'

const MarketDetailStack = createStackNavigator({
  
    // 行情详情页
    MarketDetail: {
        screen: MarketDetail,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    //讨论详情
    // DiscussDetail: {
    //     screen: DiscussDetail,
    //     navigationOptions: {
    //         header: null,
    //         gesturesEnabled: true
    //     }
    // },
},{
    initialRouteName: 'MarketDetail',
    mode: 'modal',
    headerMode: 'none',
})

const Navigation = createAppContainer(MarketDetailStack)

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
