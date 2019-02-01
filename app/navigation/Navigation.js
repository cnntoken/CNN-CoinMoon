// 所有导航信息都会加到这里来
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';
import React from 'react';
import {Image, Text} from 'react-native';
import i18n from 'app/i18n';

// 资讯 News
import NewsList from 'app/screens/News/List';
import NewsDetail from 'app/screens/News/Detail';

// 爆料 Disclose
import DiscloseList from 'app/screens/Disclose/List';
import DiscloseDetail from 'app/screens/Disclose/Detail';
import DisclosePublish from 'app/screens/Disclose/Publish';

// Mine
import MineIndex from '../screens/Mine/Index';
import MineSettings from '../screens/Mine/Settings';
import MineEidt from '../screens/Mine/Edit';
import OthersHome from '../screens/Mine/OthersHome';

// Auth
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Verify from '../screens/Auth/Verify';
import Policy from '../screens/Auth/Policy';


const TabNavigator = createBottomTabNavigator({
        News: {
            screen: NewsList
        },
        DiscloseList: {
            screen: DiscloseList
        },
        Mine: {
            screen: MineIndex,
            // navigationOptions: {
            //     tabBarOnPress: (navigation, defaultHandler) => {
            //         console.log(navigation, defaultHandler, '@@@@@@@@@@@@@@@@@@@@@@@@2');
            //         navigation.navigation.navigate('Mine', {
            //             id: ''
            //         })
            //     }
            // }
        }
    },
    // 初始路由
    {
        initialRouteName: 'News',
        // backBehavior:true,
        defaultNavigationOptions: ({navigation}) => ({
            header: null,
            gesturesEnabled: true,
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                if (routeName === 'News') {
                    if (focused) {
                        return <Image source={require('../images/icon_tabbar_news_selected.png')}/>
                    }
                    return <Image source={require('../images/icon_tabbar_news_normal.png')}/>
                } else if (routeName === 'DiscloseList') {
                    const style = {
                        top: -15
                    };
                    if (focused) {
                        return <Image source={require('../images/icon_tabbar_prophet_selected.png')} style={style}/>
                    }
                    return <Image source={require('../images/icon_tabbar_prophet_normal.png')} style={style}/>
                } else if (routeName === 'Mine') {
                    if (focused) {
                        return <Image source={require('../images/icon_tabbar_me_selected.png')}/>
                    }
                    return <Image source={require('../images/icon_tabbar_me_normal.png')}/>
                }
            },
            tabBarLabel: ({focused, horizontal, tintColor}) => {
                console.log('defaultNavigationOptions tabBarLabel');
                const style = {
                    color: tintColor,
                    fontSize: 10
                };
                const {routeName} = navigation.state;
                let text = '';
                if (routeName === 'News') {
                    text = i18n.t('component_tabbar.feed')
                } else if (routeName === 'DiscloseList') {
                    style.top = -3;
                    text = i18n.t('component_tabbar.disclose')
                } else if (routeName === 'Mine') {
                    text = i18n.t('component_tabbar.mine');
                }
                return <Text style={style}>{text}</Text>
            },
        }),
        tabBarOptions: {
            activeTintColor: '#408EF5',
            inactiveTintColor: '#666666',
            labelStyle: {
                fontSize: 10,
            },
            style: {
                backgroundColor: '#fff',
            },
        },

    });


const HomeStack = createStackNavigator({

    // 底部Bottom Tabs
    Tabs: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    DiscloseDetail: {
        screen: DiscloseDetail,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
        }
    },
    DisclosePublish: {
        screen: DisclosePublish,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
        }
    },
    NewsDetail: {
        screen: NewsDetail,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
        }
    },
    // 我的页面
    MineSettings: {
        screen: MineSettings,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    MineEidt: {
        screen: MineEidt,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
//     他人主页
    OthersHome: {
        screen: OthersHome,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
});

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Verify: {
        screen: Verify,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Policy: {
        screen: Policy,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
});

const RNApp = createAppContainer(
    createStackNavigator({
        Home: {
            screen: HomeStack,
            navigationOptions: {
                header: null
            }
        },
        Auth: {
            screen: AuthStack,
            navigationOptions: {
                header: null
            }
        }
    }, {
        initialRouteName: 'Home',
        mode: 'modal',
        headerMode: 'none',
    })
);

export default createAppContainer(RNApp);
