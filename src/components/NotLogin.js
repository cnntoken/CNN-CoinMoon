import React, {Component} from 'react';
import {
    Container,
    Button,
} from "@components/NDLayout";
import {StyleSheet, Image, Text, View} from 'react-native';
import i18n from "@i18n";
import {Row, Grid} from "react-native-easy-grid";
import {goRNPage} from "@src/utils/CNNBridge";

const styles = StyleSheet.create({
    avatar: {
        height: 80,
        top: 40,
        width: 80
    },
    btn: {
        alignItems: 'center',
        fontSize: 18,
        height: 56,
        marginTop: 159,
        justifyContent: 'center',
        width: 180,
        maxWidth: 180,
        backgroundColor: '#408EF5',
    },
    btn_text: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 25
    },
    head: {
        alignItems: 'center',
        backgroundColor: '#408EF5',
        height: 119,
        justifyContent: 'flex-end'
    },
    loginBox: {
        // alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'center',
        marginTop: 159
    },
});

class ViewControl extends Component {

    goLogin = () => {
        goRNPage({
            moduleName: 'stark_login',
        });
    };

    // goMywallet = () => {
    //     this.props.navigation.navigate('WalletImportIndex', {
    //         prevState: this.props.navigation.state
    //     });
    // };

    render() {
        return (
            <Container>

                <View style={styles.head}>
                    <Image style={styles.avatar} source={require('@images/avatar_default.png')}/>
                </View>

                <Grid>
                    <Row style={{
                        justifyContent: 'center'
                    }}>
                        <Button style={styles.btn} onPress={this.goLogin}>
                            <Text style={styles.btn_text}>{i18n.t('label_please_login')}</Text>
                        </Button>
                    </Row>
                </Grid>


            </Container>
        );
    }
}

export default ViewControl;
