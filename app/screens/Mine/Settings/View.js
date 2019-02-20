import React, {PureComponent} from 'react';
import {
    Container,
    Header,
    Text,
    Button,
    Left,
    Right,
    Body,
    Title,
    ActionSheet
} from "native-base";
import {Image, View, TouchableOpacity, Linking} from 'react-native';
import styles from './styles';
import i18n from 'app/i18n';

class ViewControl extends PureComponent {
    onLogout = () => {
        ActionSheet.show(
            {
                options: [i18n.t('exit'), i18n.t('cancel')],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
                title: i18n.t('confirm_logout')
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    this.props.onLogout({}, () => {
                        this.props.navigation.popToTop()
                    })
                }
            }
        )
    };


    goBack = () => {
        this.props.navigation.pop();
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
        const {userInfo} = this.props;
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_black.png')} style={{width: 12, height: 23}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{i18n.t('settting')}</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.content}>
                    <View style={styles.wrap}>
                        <TouchableOpacity  style={styles.item_feedback} onPress={this.openEmail} >
                            <Text style={styles.l_right}>{i18n.t('user_feedback')}</Text>
                            <Image source={require('app/images/icon_next.png')} style={{
                                width: 10,
                                height: 17
                            }}/>
                        </TouchableOpacity>
                        <View style={styles.item}>
                            <Text
                                style={styles.l_left}>{i18n.t('account')}: {userInfo.attributes && userInfo.attributes.email}</Text>
                            <TouchableOpacity onPress={this.onLogout}>
                                <Text style={styles.l_right}>{i18n.t('logout')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
