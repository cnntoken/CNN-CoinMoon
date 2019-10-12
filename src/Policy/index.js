import React, {Component} from 'react';
import { View, ActivityIndicator,Image,Text} from 'react-native';
import Header from '@components/NDLayout/Header'
import WebContent from '../components/WebContent';
import {closeRNPage} from '../utils/CNNBridge'
import {resetCurrentLocale} from '@i18n';
import i18n from '../i18n';

const urlObj = {
    privacy : {
        en: 'http://a.fslk.co/cnn/h5/privacyPolicy.html',
        ko: 'http://a.fslk.co/cnn/h5/personalInfoCollecttion.html'
    },
    terms: {
        en: 'http://a.fslk.co/cnn/h5/userAgreement.html',
        ko: 'http://a.fslk.co/cnn/h5/radius.html'
    }
}
class Page extends Component {

    constructor(props) {
        super(props);
        
        const lang = props.baseInfo.currentLang || 'en';
        resetCurrentLocale(lang)
        let url = '';
       if(props.params.policy === 'privacy'){
            if(lang === 'ko'){
                url = urlObj.privacy.ko
            }else{
                url = urlObj.privacy.en
            }
       }else{
            if(lang === 'ko'){
                url = urlObj.terms.ko
            }else{
                url = urlObj.terms.en
            }
       }
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
                <Header
                    leftClick={this.goBack}
                    style={{backgroundColor: '#fff'}}
                    leftView={<Text style={{color:'#333333',fontSize: 16}}>{i18n.t('label_cancel')}</Text>}
                    title={<Image source={require('../images/logo_small.png')} style={{width: 74, height: 40}} />}
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
