import React, {Component} from 'react';
import { View, ActivityIndicator,Image,Text} from 'react-native';
import CustomHeader from '../components/Header'
import WebContent from '../components/WebContent';
import {closeRNPage} from '../utils/CNNBridge'
import i18n from '../i18n';

class Page extends Component {

    constructor(props) {
        super(props);
        const url = props.params.policy === 'privacy' ? 'http://a.fslk.co/cnn/h5/personalInfoCollecttion.html' : 'http://a.fslk.co/cnn/h5/radius.html';
        this.state = {
            url,
            loading: true
        }
    }

    goBack = () => {
        closeRNPage();
    };

    onReady = () => {
        this.setState({
            loading: false
        })
    };
    render() {
        const {loading} = this.state;
        return (
            <View style={{flex:1}}>
                <CustomHeader 
                    onLeftClick={this.goBack} 
                    style={{backgroundColor: '#fff'}}
                    leftView={<Text style={{color:'#333333',fontSize: 16}}>{i18n.t('label_cancel')}</Text>} 
                    titleView={<Image source={require('../images/logo_small.png')} style={{width: 74, height: 40}} />}
                />
                <View style={{flex: 1}}>
                    {loading && <ActivityIndicator size={'small'} color={'#408EF5'}/>}
                    <WebContent url={this.state.url} onReady={this.onReady} showVerticalIndictor={true}/>
                </View>
            </View>
        );
    }
}

export default Page;
