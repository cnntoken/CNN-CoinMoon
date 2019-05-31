import React, {PureComponent} from 'react';

import {View, Text, StyleSheet, } from 'react-native';
import {Button} from 'native-base';

const styles = StyleSheet.create({
    wrap: {marginHorizontal:12, backgroundColor:'rgba(64,142,245,0.1)',padding:15},
    row: {
        position: 'relative',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    title: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '500'
    },
    close: {
        position: 'absolute',
        fontSize: 13,
        right: 0
    },
    content: {
        marginTop: 10,
        fontSize: 11,
        color: '#333'
    },
    btn: {
        marginTop: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 30,
        paddingVertical: 6,
        paddingHorizontal: 20
    },
    btnText:{
        color: '#fff',
        fontSize: 13,
    }
})

export default class SecurityTip extends PureComponent{
    render (){
        const {style={}} = this.props;
        return (
            <View style={[styles.wrap,style]}>
                <View style={styles.row}>
                    <Text style={styles.title}>安全提醒</Text>
                    <Text style={styles.close}>稍后提醒</Text>
                </View>
                <Text style={styles.content}>你的身份助记词未备份，请务必备份助记词，以用于恢复身份下钱包资产，防止忘记密码，应用删除，手机丢失等情况导致资产损失。</Text>
                <Button style={styles.btn}><Text style={styles.btnText}>备份助记词</Text></Button>
            </View>
        )
    }
}