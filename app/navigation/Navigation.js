// 所有导航信息都会加到这里来
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';


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


const BottomTab = createBottomTabNavigator({
        News: {
            screen: NewsList,
            navigationOptions: {}
        },
        DiscloseList: {
            screen: DiscloseList,
            navigationOptions: {}
        },
        Mine: {
            screen: Mine,
            navigationOptions: {}
        }
    },    // 初始路由
    {
        initialRouteName: 'News'
    }
);


const RNApp = createStackNavigator(
    {
        Home: {
            screen: BottomTab,
            navigationOptions: {}
        },

        DiscloseDetail: {
            screen: DiscloseDetail,
            navigationOptions: {
                header: null,
                gesturesEnabled: true,
                mode: 'modal',
                tabBarVisible: true
            }
        },
        DisclosePublish: {
            screen: DisclosePublish,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);


export default RNApp;
