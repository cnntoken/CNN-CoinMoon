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
import {Image, View, TouchableOpacity} from 'react-native';
import InputFocus from 'app/components/InputFocus';
import userService from 'app/services/user';
import styles from './styles';
import {$toast} from 'app/utils';
import i18n from 'app/i18n';
import * as Types from 'app/actions/types'
import NavigationService from 'app/navigation/NavigationService'

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
    }
    goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        const {userInfo} = this.props;
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_black.png')} style={{width: 10, height: 18}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{i18n.t('settting')}</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.content}>
                    <View style={styles.wrap}>
                        <View style={styles.item}>
                            <Text style={styles.l_left}>{i18n.t('account')}: {userInfo.attributes && userInfo.attributes.email}</Text>
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
