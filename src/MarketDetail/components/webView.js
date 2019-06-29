import React, {PureComponent, Component} from 'react';
import {
    View,
    Platform,
    Text
} from 'react-native';
import {
    Spinner
} from '@components/NDLayout'
import {WebView} from "react-native-webview";

class TrendingWebView extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            // uri: props.uri
        };
    }


    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.uri === nextState.uri) {
            return false
        }
        return true

    }

    // componentDidMount = () => {
    //     // debugger;
    //     this.setState({
    //         init: false
    //     })
    // };

    onLoadEnd = (e) => {
        this.props.onLoadEnd(this.trendingviewWeb, e);
    };

    onMessage = (e) => {
        // setTimeout(() => {
        //     this.setState({
        //         loaded: true,
        //     });
        // }, 1000);
        this.setState({
            loaded: true,
        });
        this.props.onMessage(this.trendingviewWeb, e);
    };

    componentWillUnmount = () => {
        this.trendingviewWeb = null;
    };
    loadingSpinner = () => {
        return <Spinner/>
    }
    _onShouldStartLoadWithRequest = (e) => {
        if(e.url.includes('www.tradingview.com')){
            return false
        }
        return true
    }
    onError = () => {
        console.log('webview load error')
    }
    render() {
        return (
            <WebView
                style={{height:345}}
                source={{uri: this.props.uri}}
                ref={(webview) =>
                    this.trendingviewWeb = webview
                }
                // automaticallyAdjustContentInsets={true}
                originWhitelist={Platform.OS === 'ios'?['*']:['','https://a.fslk.co/test/.*']}
                // originWhitelist={['http://', 'https://a.fslk.*']}
                onLoadEnd={this.onLoadEnd}// 加载成功或者失败都会回调
                onMessage={this.onMessage}
                injectedJavaScript='true'
                // cacheEnabled={false}
                // mixedContentMode='compatibility'
                javaScriptEnabled={true} //指定WebView中是否启用JavaScript
                startInLoadingState={true}  //强制WebView在第一次加载时先显示loading视图
                renderLoading={this.loadingSpinner}
                onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                onError={this.onError}
                renderError={() => {
                    return <View style={{backgroundColor:'#183B60',height:'100%',width:'100%'}}/>;
                }}
            />
        );
    }
}

export default TrendingWebView;
