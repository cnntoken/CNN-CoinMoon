// 所有导航信息都会加到这里来
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';

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
import Mine from 'app/screens/Mine';

// Auth
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Verify from '../screens/Auth/Verify';

const TabNavigator = createBottomTabNavigator({
        News: {
            screen: NewsList,
            navigationOptions: {
                title: 'HOME',
                header: null,
                gesturesEnabled: true
            }
        },
        DiscloseList: {
            screen: DiscloseList,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        },
        Mine: {
            screen: Mine,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        }
    },
    // 初始路由
    {
        initialRouteName: 'News',
        // tabBarOptions: {
        //     activeTintColor: '#e91e63',
        //     labelStyle: {
        //         fontSize: 12,
        //     },
        //     style: {
        //         backgroundColor: '#fff',
        //     },
        // },
        // TabBarComponent: props => {
        //     return (
        //         <Footer>
        //             <FooterTab>
        //                 <Button
        //                     vertical
        //                     // active={props.navigationState.index === 0}
        //                     onPress={() => props.navigation.navigate("Lucy")}>
        //                     {/*<Icon name="bowtie" />*/}
        //                     <Text>Lucy</Text>
        //                 </Button>
        //                 <Button
        //                     vertical
        //                     active={props.navigationState.index === 1}
        //                     onPress={() => props.navigation.navigate("Nine")}>
        //                     <Icon name="briefcase" />
        //                     <Text>Nine</Text>
        //                 </Button>
        //                 <Button
        //                     vertical
        //                     // active={props.navigationState.index === 2}
        //                     onPress={() => props.navigation.navigate("Jade")}>
        //                     {/*<Icon name="headset" />*/}
        //                     <Text>Jade</Text>
        //                 </Button>
        //             </FooterTab>
        //         </Footer>
        //     );
        // }
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
            header: null,
            tabBarVisible: false
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
},{
    initialRouteName: 'Login'
})
const RNApp = createAppContainer(
    createSwitchNavigator({
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
        initialRouteName: 'Home'
    })
);

export default createAppContainer(RNApp);
