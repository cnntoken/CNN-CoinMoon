// 所有导航信息都会加到这里来
import {createAppContainer,createStackNavigator} from 'react-navigation';

import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Verify from '../screens/Auth/Verify';
import Home from 'app/screens/Home';
import List from 'app/screens/List';
import Mine from 'app/screens/Mine';
import Publish from 'app/screens/Publish';

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        },
        Verify: {
            screen: Verify,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        },
        List: {
            screen: List,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        },
        Mine : {
            screen: Mine,
            // navigationOptions: {
            //     header: null,
            //     gesturesEnabled: false
            // }
        },
        Publish : {
            screen: Publish,
        }
    },

    {
        initialRouteName: 'Verify'
    }
);

export default createAppContainer(AppNavigator);
