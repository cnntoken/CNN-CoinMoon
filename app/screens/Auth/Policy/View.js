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

    goBack = () => {
        this.props.navigation.pop()
    }

    render() {
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: 'http://a.fslk.co/cnn/h5/personalInfoCollecttion.html' }}
                    style={styles.container}
                />
            </Container>
        );
    }
}

export default ViewControl;
