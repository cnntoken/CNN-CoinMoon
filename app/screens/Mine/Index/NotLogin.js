import React, {Component} from 'react';
import {
    Container,
    Text,
    Button,
    View
} from "native-base";
import {StyleSheet, Image} from 'react-native';
import NavigationService from 'app/navigation/NavigationService'

const styles = StyleSheet.create({
    head: {
        height: 119,
        backgroundColor: '#408EF5',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    avatar: {
        top: 40,
        width: 80,
        height: 80
    },
    loginBox:{
        flexDirection: 'row',
        marginTop: 159,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 180,
        height: 56,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

class ViewControl extends Component {
    goLogin = ()=>{
        // this.props.navigation.navigate('Auth')
        NavigationService.navigate('Auth')
    }
    render() {
        return (
            <Container>
                {/* <Header></Header> */}
                <View style={styles.head}>
                    <Image style={styles.avatar} source={require('app/images/avatar_default.png')}/>
                </View>
                <View style={styles.loginBox}>
                    <Button primary style={styles.btn} onPress={this.goLogin}>
                        <Text>请登录</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
