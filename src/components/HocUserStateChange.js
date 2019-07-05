import React, {Component} from 'react';
import {DeviceEventEmitter, NetInfo} from 'react-native';
import {getCurrentUser} from '@utils/CNNBridge';
import {adaptUserInfo, $toast} from "@utils";
import i18n from '@i18n';

const HOC = (WrappedComponent) => {
    return class WrapperComponent extends Component {


        constructor(props) {
            super(props);
            this.state = {
                user: props.user || {},
            };
        }

        async componentWillMount() {

            const user = await getCurrentUser({});
            this.setState({user: adaptUserInfo(user)});

            this.userStateListener = DeviceEventEmitter.addListener('userStateChange', async (data) => {
                const newUser = await getCurrentUser({});
                this.setState({user: adaptUserInfo(newUser)});
            });


            // this.network = NetInfo.isConnected.addEventListener(
            //     'change',
            //     (isConnected) => {
            //         // console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
            //         if (!isConnected) {
            //             $toast(i18n.t('net_error'));
            //         }
            //     }
            // );

        }

        componentWillUnmount() {
            this.userStateListener.remove();
            // this.network.remove();
        }


        render() {
            return <WrappedComponent {...this.props} user={this.state.user}/>;
        }
    }

};

export default HOC;
