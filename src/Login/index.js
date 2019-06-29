
/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import sagas from '../sagas/login';
import reducer from '../reducers/userReducer';
import Container from './Container';


export default class Page extends PureComponent{
    render(){
        const {params = {}} = this.props;
        const store = configureStore({event: params.event || {} },reducer,sagas);
       return (<Provider store={store}>
        <Container/>
       </Provider>)
    }
}