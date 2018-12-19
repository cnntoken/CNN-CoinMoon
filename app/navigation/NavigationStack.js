// 所有导航信息都会加到这里来
import {createStackNavigator} from 'react-navigation';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import List from 'app/screens/List';
import Mine from 'app/screens/Mine';

const RNApp = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {header: null, gesturesEnabled: true}
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
        }
    },

    {
        initialRouteName: 'Home'
    }
);

export default RNApp;
