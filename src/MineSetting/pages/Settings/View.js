import React, {PureComponent} from 'react';

import {
    Container,
    Button,
    Header
} from "@components/NDLayout";


import {Image, View, TouchableOpacity, Linking, DeviceEventEmitter, Text, ActionSheetIOS} from 'react-native';
import styles from './styles';
import i18n from '@i18n';
import {Grid, Col, Row} from 'react-native-easy-grid'
import {closeRNPage} from "@src/utils/CNNBridge";
import {ActionSheet, cnnLogger} from "@utils";

class ViewControl extends PureComponent {

    onLogout = () => {
        ActionSheet(
            {
                options: [i18n.t('exit'), i18n.t('cancel')],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
                title: i18n.t('confirm_logout'),
                colors: ['#FF3B30', '#007AFF']
            },
            buttonIndex => {

                if (buttonIndex === 0) {
                    this.props.onLogout({
                        callback: () => {
                            closeRNPage();
                        }
                    })
                }
            }
        )
    };


    goBack = () => {
        closeRNPage();
    };

    openEmail = () => {
        let url = `mailto:jieun@cnntoken.io`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                // console.log('Can\'t handle url: ' + url);
                return Linking.openURL('https://t.me/cnn_official_korean_community');
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    render() {

        const {user} = this.props;
        let userInfo = user;

        return (
            <Container>
                <Header title={i18n.t('settting')} style={{backgroundColor: '#fff'}} leftClick={this.goBack} leftView={ <Image source={require('@images/icon_back_black.png')} style={{width: 12, height: 23}}/>}/>
                <Grid>
                    <Row style={{
                        height: 10,
                        backgroundColor: '#F5F5F5'
                    }}/>

                    <Row style={{
                        height: 56,
                        paddingHorizontal: 24,
                        alignItems: 'center',
                        borderBottomColor: 'rgba(245,245,245,1)',
                        borderBottomWidth: 1
                    }}>
                        <Col>
                            <Text style={styles.l_right}>{i18n.t('user_feedback')}</Text>
                        </Col>
                        <Col style={{
                            width: 80
                        }}>
                            <TouchableOpacity style={styles.item_feedback} onPress={this.openEmail}>
                                <Image source={require('@images/icon_next.png')} style={{
                                    width: 10,
                                    height: 17
                                }}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>

                    {/*用户信息*/}
                    {
                        userInfo && userInfo.name ? <Row style={{
                            height: 56,
                            paddingHorizontal: 24,
                            alignItems: 'center',
                            borderBottomColor: 'rgba(245,245,245,1)',
                            borderBottomWidth: 1
                        }}>
                            <Col>
                                <Text style={styles.l_left}>{i18n.t('account')}: {userInfo && userInfo.name}</Text>
                            </Col>
                            <Col style={{
                                width: 80
                            }}>
                                <TouchableOpacity onPress={this.onLogout}>
                                    <Text style={[styles.l_right, {
                                        textAlign: 'right'
                                    }]}>{i18n.t('logout')}</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row> : null

                    }


                    {/*版本信息*/}
                    <Row style={{
                        height: 56,
                        paddingHorizontal: 24,
                        alignItems: 'center',
                        borderBottomColor: 'rgba(245,245,245,1)',
                        borderBottomWidth: 1
                    }}>
                        <Col>
                            <Text style={styles.l_left}>{i18n.t('version')}: 2.0</Text>
                        </Col>
                        <Col style={{
                            width: 80
                        }}>
                            {/*<Text style={[styles.l_right, {*/}
                            {/*textAlign: 'right'*/}
                            {/*}]}>1.2</Text>*/}
                        </Col>
                    </Row>

                    <Row/>
                </Grid>

            </Container>
        );
    }
}

export default ViewControl;
