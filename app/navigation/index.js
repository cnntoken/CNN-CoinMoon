import React, {Component} from 'react';
import Navigation from './Navigation';
import NavigationService from './NavigationService';

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
