import React, {PureComponent} from 'react';
import { WebView } from 'react-native-webview';
import { Spinner } from 'native-base';
import {Platform,ScrollView} from 'react-native';
class WebContent extends PureComponent {
    constructor(props){
        super(props)
        let {html, url} = props;
        if(html){
            html = this.generateDOM(html);
        }
        this.state = {
            WebViewHeight: 0,
            url,
            source: url ? {uri: url} :{html}
        }
    }
    generateDOM = (content)=>{
        return `
            <!doctype html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
                <style>
                    *{
                        margin:0;
                        padding:0
                    }
                    img{
                        max-width: 100% !important;
                    }
                    body{
                        width: 100%;
                        overflow-x: hidden;
                        word-break: break-all;
                    }
                </style>
            </head>
            <body>
                ${content}
                <div id="rn-webview-bottom-box-sign"></div>
                <script>
                    var global_height = 0;
                    var globalPostDocumentHeight = function(){
                        var $signbox = document.getElementById('rn-webview-bottom-box-sign')
                        var height = $signbox ? $signbox.offsetTop : document.body.scrollHeight;
                        if(height !== global_height){
                            global_height = height;
                            window.ReactNativeWebView.postMessage(Math.ceil(height).toFixed(0));
                        }
                    };
                    document.addEventListener("DOMContentLoaded", globalPostDocumentHeight);
                    setTimeout(globalPostDocumentHeight,400);
                </script>
            </body>
            </html>
        `
    }
    handleMessage = (event)=>{
        console.log(`handelMessaeg`, parseInt(event.nativeEvent.data))
        this.setState({
            WebViewHeight: parseInt(event.nativeEvent.data,10)
        })
        
        if(!this.isReady){
            this.isReady = true;
            this.props.onReady && this.props.onReady()
        }
    }
    indicatorLoadingView = ()=>{
        return <Spinner size={'small'} color={'#408EF5'}/>
    }
    webViewLoaded = ()=>{
        this._webview.injectJavaScript(`
            if(typeof globalPostDocumentHeight == 'function'){
                globalPostDocumentHeight();
            }else{
                var height = document.body.scrollHeight;
                window.ReactNativeWebView.postMessage(Math.ceil(height).toFixed(0));
            }
        `)
    }
    render() {
        const {style={},showVerticalIndictor=false} = this.props;
        const {WebViewHeight,source} = this.state;
        const newStyle = {...style}
        if(WebViewHeight){
            newStyle.height = WebViewHeight
        }
        const Web = <WebView
                    // startInLoadingState={true}
                    // renderLoading={this.indicatorLoadingView}
                    ref={(node)=>{this._webview = node}}
                    originWhitelist={['*']}
                    source={source}
                    style={newStyle}
                    onLoad={this.webViewLoaded}
                    onMessage={this.handleMessage}
                    javaScriptEnabled={true}
                    injectedJavaScript='true'
                    mixedContentMode='compatibility'
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
        if(Platform.OS === 'android'){
            return <ScrollView
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={showVerticalIndictor} 
                style={{flex:1}}>
                {Web}
            </ScrollView>
        }
        return Web;
    }
}

export default WebContent;
