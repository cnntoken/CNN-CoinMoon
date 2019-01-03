import React, {Component} from 'react';
import {
    Container,
    Content,
    Header,
    Left,
    Right,
    Text,
    Button,
    View
} from "native-base";
import PropTypes from 'prop-types';
import {StyleSheet, Image} from 'react-native';
import UserAvatar from './Components/UserAvatar';

const styles = StyleSheet.create({
    content:{
        backgroundColor: '#F5F5F5'
    },
    head: {
        height: 119,
        backgroundColor: '#408EF5',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bg:{
        height: 55,
        backgroundColor: '#408EF5',
    },
    userInfo:{
        height: 104,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    userAvatar: {
        top: -40,
        marginLeft: 30
    },
    editBtn:{
        marginRight: 16,
        marginTop: 10,
        fontSize: 14
    }
})

class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
        // setUserInfo: PropTypes.func.isRequired,
    }
    goEdit = ()=>{
        this.props.navigation.navigate('Edit')
    }
    goSettings = ()=>{
        this.props.navigation.navigate('Settings')
    }
    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <UserAvatar info={{avatar: require('app/images/avatar_default.png'), nickname: '一只蚂蚁'}}/>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.goSettings}>
                            <Image source={require('app/images/icon_settings.png')}/>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.userBox}>
                        <View style={styles.bg}></View>
                        <View style={styles.userInfo}>
                            <UserAvatar style={styles.userAvatar} info={{avatar: require('app/images/avatar_default.png'), nickname: '一只蚂蚁'}} big/>
                            <Button transparent onPress={this.goEdit}>
                                <Text>编辑信息</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ViewControl;
