import React, {PureComponent} from 'react';
import { WebView } from 'react-native-webview';

class WebContent extends PureComponent {
    constructor(props){
        super(props)
        const {html} = props;
        this.state = {
            WebViewHeight: 0,
            html: this.generateDOM(html)
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
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `
    }
    handleMessage = (event)=>{
        this.setState({
            WebViewHeight: parseInt(event.nativeEvent.data)
        })
        this.props.onReady && this.props.onReady()
    }
    webViewLoaded = ()=>{
        this._webview.injectJavaScript(`
            var height = document.body.scrollHeight;
            
            window.postMessage(Math.ceil(height).toFixed(0))
        `)
    }
    render() {
        const {style={}} = this.props;
        const {html,WebViewHeight} = this.state;
        const newStyle = {...style}
        if(WebViewHeight){
            newStyle.height = WebViewHeight
        }
        return (
            <WebView
                ref={(node)=>{this._webview = node}}
                originWhitelist={['*']}
                source={{ html }}
                style={newStyle}
                onLoad={this.webViewLoaded}
                onMessage={this.handleMessage}
                javaScriptEnabled={true}
                injectedJavaScript='true'
            />
        );
    }
}

export default WebContent;
