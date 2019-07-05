import React, {Component} from 'react';
import {
    Container,
    Button,
} from "@components/NDLayout";
import {StyleSheet, Image, Text, View, PixelRatio} from 'react-native';
import i18n from "@i18n";
import {Row, Grid, Col} from "react-native-easy-grid";
import {goRNPage} from "@src/utils/CNNBridge";
import FastImage from 'react-native-fast-image';
import {isIOS, cnnLogger} from '@utils';
import service from '@services/wallet/index';


const styles = StyleSheet.create({

    avatar: {
        height: 60,
        // top: 40,
        width: 60,
        borderRadius: 30,
        // backgroundColor: '#eee'
    },

    btn: {
        alignItems: 'center',
        fontSize: 18,
        height: 30,
        maxHeight: 30,
        // marginTop: 159,
        justifyContent: 'center',
        // width: 74,
        // maxWidth: 74,
        // maxWidth: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 5

    },

    btn_text: {
        color: '#408EF5',
        fontSize: 14,
        lineHeight: 25,
        marginHorizontal: 15
    },
    head: {
        alignItems: 'center',
        backgroundColor: '#408EF5',
        height: 119,
        justifyContent: 'space-between'
    },
    loginBox: {
        // alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'center',
        marginTop: 159
    },

    big_btn: {
        // marginTop: 159,
        borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderBottomColor: '#E6E6E6',
        borderRadius: 0,
        backgroundColor: '#fff',

    },

    btn_grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

class ViewControl extends Component {

    goLogin = () => {

        goRNPage({
            moduleName: 'stark_login',
            params:{
                event:{
                    from: 'Mine',
                    trigger: 'login',
                }
            }
        });
    };

    goWallet = async () => {
        goRNPage({
            moduleName: 'stark_wallet',
        });
        const {btc,eth} = await service.checkStatus()
        cnnLogger('click_wallet',{
            has_wallet: (btc || eth)?true:false
        })

    };

    goMine = () => {
        goRNPage({
            moduleName: 'stark_myHome',
        });
    };

    goSetting = () => {
        goRNPage({
            moduleName: 'stark_mine_setting',
            // params:{
            //     initialRoute: 'Edit'
            // }
        })
    };

    goSettings = () => {
        goRNPage({
            moduleName: 'stark_mine_setting',

        })
    };

    returnAvatar = () => {

        let user = this.props.user;


        if (isIOS) {
            return <FastImage style={styles.avatar} source={user.avatar ? {
                uri: user.avatar
            } : require('@images/avatar_default.png')}/>
        }

        return <Image style={styles.avatar} source={user.avatar ? {
            uri: user.avatar
        } : require('@images/avatar_default.png')}/>


    };

    render() {
        let user = this.props.user;
        // console.log('999999999', user.avatar);
        return (
            <Container>

                <View style={styles.head}>
                    <Grid style={{
                        justifyContent: 'space-around',
                        display: 'flex',
                        flexDirection: 'row',
                    }}>

                        <Col style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: 60,
                            marginLeft: 24
                        }}>
                            {
                                this.returnAvatar()
                            }

                        </Col>

                        <Col/>

                        <Col style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: 100,
                            // backgroundColor: '#eee',
                            marginRight: 24
                        }}>
                            <Button style={[styles.btn, {width: '100%'}]} onPress={this.goMine}>
                                <Text
                                    numberOfLines={1}
                                    style={[styles.btn_text]}>{i18n.t('page_mine.mine_page')}</Text>
                            </Button>
                        </Col>
                    </Grid>
                </View>

                <Grid style={{
                    borderTopColor: '#F5F5F5',
                    borderTopWidth: 10
                }}>
                    <Row style={{
                        justifyContent: 'center',
                        height: 60

                    }}>
                        <Button style={styles.big_btn} onPress={this.goWallet}>
                            <Grid style={styles.btn_grid}>
                                <Col style={{
                                    width: 20,
                                    marginLeft: 19,
                                    marginRight: 12
                                }}>
                                    <Image source={require('@images/wallet.png')}/>
                                </Col>
                                <Col>
                                    <Text style={styles.btn_text}>{i18n.t('page_mine.mine_wallet')}</Text>
                                </Col>
                                <Col style={{
                                    width: 10,
                                    marginRight: 24,
                                }}>
                                    <Image source={require('@images/icon_next.png')}/>
                                </Col>
                            </Grid>
                        </Button>
                    </Row>
                    <Row style={{
                        justifyContent: 'center',
                        height: 60
                    }}>
                        <Button style={styles.big_btn} onPress={this.goSetting}>
                            <Grid style={styles.btn_grid}>
                                <Col style={{
                                    width: 20,
                                    marginLeft: 19,
                                    marginRight: 12
                                }}>
                                    <Image source={require('@images/settings.png')}/>
                                </Col>
                                <Col>
                                    <Text style={styles.btn_text}>{i18n.t('page_mine.setting')}</Text>
                                </Col>
                                <Col style={{
                                    width: 10,
                                    marginRight: 24,
                                }}>
                                    <Image source={require('@images/icon_next.png')}/>
                                </Col>
                            </Grid>
                        </Button>
                    </Row>
                </Grid>


            </Container>
        );
    }
}

export default ViewControl;
