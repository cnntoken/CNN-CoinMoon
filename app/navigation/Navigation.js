// 所有导航信息都会加到这里来
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';
import React from 'react';
import {Image,Text} from 'react-native';
import userService from 'app/services/user'

// import {CustomTabComponent} from './CustomTabComponent'

// import { BottomTabBar } from 'react-navigation-tabs';

// const TabBarComponent = (props) => (<BottomTabBar {...props} />);


// import {
//     Container,
//     Header,
//     Content,
//     Text,
//     Button,
//     Left,
//     Right,
//     Body,
//     Title,
//     FooterTab,
//     Icon,
//     Footer
// } from "native-base";

// 资讯 News
import NewsList from 'app/screens/News/List';
import NewsDetail from 'app/screens/News/Detail';
import NewsPublish from 'app/screens/News/Publish';

// 爆料 Disclose
import DiscloseList from 'app/screens/Disclose/List';
import DiscloseDetail from 'app/screens/Disclose/Detail';
import DisclosePublish from 'app/screens/Disclose/Publish';

// Mine
import MineIndex from '../screens/Mine/Index';
import MineSettings from '../screens/Mine/Settings';
import MineEidt from '../screens/Mine/Edit';

// Auth
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Verify from '../screens/Auth/Verify';


const TabNavigator = createBottomTabNavigator({
        News: {
            screen: NewsList
        },
        DiscloseList: {
            screen: DiscloseList
        },
        Mine: {
            screen: MineIndex
        }
    },
    // 初始路由
    {
        initialRouteName: 'News',
        defaultNavigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: true,
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if(routeName === 'News'){
                    if(focused){
                        return <Image source={require('../images/icon_tabbar_news_selected.png')}/>
                    }
                    return <Image source={require('../images/icon_tabbar_news_normal.png')}/>
                }else if(routeName === 'DiscloseList'){
                    const style = {
                        top: -15
                    }
                    if(focused){
                        return <Image source={require('../images/icon_tabbar_prophet_selected.png')} style={style}/>
                    }
                    return <Image source={require('../images/icon_tabbar_prophet_normal.png')} style={style}/>
                }else if(routeName === 'Mine'){
                    if(focused){
                        return <Image source={require('../images/icon_tabbar_me_selected.png')}/>
                    }
                    return <Image source={require('../images/icon_tabbar_me_normal.png')}/>
                }
            },
            tabBarLabel: ({ focused, horizontal, tintColor }) => {
                console.log('defaultNavigationOptions tabBarLabel')
                const style = {
                    color: tintColor,
                    fontSize: 10
                }
                const { routeName } = navigation.state;
                let text = '';
                if(routeName === 'News'){
                    text = '资讯'
                }else if(routeName === 'DiscloseList'){
                    style.top = -3
                    text = '先知'
                }else if(routeName === 'Mine'){
                    text = '我'
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
        }
    });


const HomeStack = createStackNavigator({
    // DisclosePublish: {
    //     screen: DisclosePublish,
    //     navigationOptions: {
    //         header: null,
    //         tabBarVisible: false,
    //     }
    // },
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
            title: 'HOME',
            header: null,
            tabBarVisible: false,
        }
    },
    NewsPublish: {
        screen: NewsPublish,
        navigationOptions: {
            title: 'HOME',
            header: null,
            gesturesEnabled: true
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
    }
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
    },{
        initialRouteName: 'Home',
        mode: 'modal',
        headerMode: 'none',
    })
);

export default createAppContainer(RNApp);
