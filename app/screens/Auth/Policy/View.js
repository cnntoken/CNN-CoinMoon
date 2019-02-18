import React, {Component} from 'react';
import styles from './styles';
import {Container,Spinner} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import WebContent from 'app/components/WebContent';
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
            url,
            loading: true
        }
    }

    goBack = () => {
        this.props.navigation.pop()
    }
    onReady = ()=>{
        this.setState({
            loading: false
        })
    }
    render() {
        const {loading} = this.state;
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <View style={styles.container}>
                    {loading && <Spinner size={'small'} color={'#408EF5'}/>}
                    <WebContent url={this.state.url} onReady={this.onReady}/>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
