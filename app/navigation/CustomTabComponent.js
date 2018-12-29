/**
 * @desc 自定义TabBar
 * */
import React from 'react';
import {Keyboard} from 'react-native';
import {BottomTabBar} from 'react-navigation-tabs';

import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Title,
    FooterTab,
    Icon,
    Footer
} from "native-base";

export default class CustomTabComponent extends React.Component {

    state = {visible: true};

    componentDidMount() {
        this.kbShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.kbHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }

    keyboardWillShow = () => {
        console.log('keyboardwillshow');
        this.setState({visible: false});
    };

    keyboardWillHide = () => {
        console.log('keyboardwillhide');
        this.setState({visible: true});
    };

    componentWillUnmount() {
        this.kbShowListener.remove();
        this.kbHideListener.remove();
    }

    render() {
        return <Footer>
            <FooterTab>
                <Button
                    vertical
                    // active={props.navigationState.index === 0}
                    onPress={() => this.props.navigation.navigate("LucyChat")}>
                    {/*<Icon name="bowtie"/>*/}
                    <Text>Lucy</Text>
                </Button>
                <Button
                    vertical
                    // active={props.navigationState.index === 1}
                    onPress={() => this.props.navigation.navigate("JadeChat")}>
                    {/*<Icon name="briefcase"/>*/}
                    <Text>Nine</Text>
                </Button>
                <Button
                    vertical
                    // active={props.navigationState.index === 2}
                    onPress={() => this.props.navigation.navigate("NineChat")}>
                    {/*<Icon name="headset"/>*/}
                    <Text>Jade</Text>
                </Button>
            </FooterTab>
        </Footer>;
        // return this.state.visible && <BottomTabBar {...this.props}>
        //
        // </BottomTabBar>;

    }
}
