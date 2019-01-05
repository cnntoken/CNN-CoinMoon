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
import {Image,View,TouchableOpacity} from 'react-native';
import InputFocus from 'app/components/InputFocus';
import userService from 'app/services/user';
import styles from './styles';
import { $toast } from 'app/utils';
import * as Types from 'app/actions/types'
import NavigationService from 'app/navigation/NavigationService'
class ViewControl extends PureComponent {
    onLogout = ()=>{
        ActionSheet.show(
            {
              options: ['退出','取消'],
              cancelButtonIndex: 1,
              destructiveButtonIndex: 0,
              title: "确认退出登录"
            },
            buttonIndex => {
              if(buttonIndex === 0){
                  this.props.onLogout({},()=>{
                      this.props.navigation.popToTop()
                  })
              }
            }
        )
    }
    goBack = ()=>{
        this.props.navigation.pop();
    }
    render() {
        const {userInfo} = this.props;
        return (
            <Container >
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_black.png')} style={{width:10,height:18}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>设置</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.content}>
                    <View style={styles.wrap}>
                        <View style={styles.item}>
                            <Text style={styles.l_left}>账户: {userInfo.attributes && userInfo.attributes.email}</Text>
                            <TouchableOpacity onPress={this.onLogout}>
                                <Text style={styles.l_right}>退出登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
