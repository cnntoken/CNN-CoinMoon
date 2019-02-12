import React, {Component} from 'react';
import styles from './styles';
import {Container} from 'native-base';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import { WebView } from 'react-native-webview';

class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
        const {navigation} = props;
        const policy = navigation.getParam('policy');
        const url = policy === 'privacy' ? 'http://a.fslk.co/cnn/h5/personalInfoCollecttion.html' : 'http://a.fslk.co/cnn/h5/radius.html';
        this.state = {
            url
        }
    }

    goBack = () => {
        this.props.navigation.pop()
    }

    render() {
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: this.state.url }}
                    style={styles.container}
                />
            </Container>
        );
    }
}

export default ViewControl;
