import React, {Component} from 'react';
import styles from './styles';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    // Left,
    // Right,
    // Body,
    Form,
    Textarea,
    // Title,
    // FooterTab,
    Thumbnail, Left, Body, Title, Right,
    // View,
    // Image,
    // Footer, List, ListItem,
} from "native-base";

import {Col, Row, Grid} from 'react-native-easy-grid';

import {View, Image, Button as Btn} from 'react-native';

import ImagePicker from 'react-native-image-picker';


// import {API} from 'aws-amplify';

// const btn_add_source = require("../../../images/btn_add.png");

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            text: '',
            images: [
                require("../../../../assets/contacts/megha.png"),
                require("../../../../assets/contacts/atul.png"),
                require("../../../../assets/contacts/saurabh.png"),
                require("../../../../assets/contacts/saurabh.png"),
                require("../../../../assets/contacts/saurabh.png"),
                require("../../../../assets/contacts/saurabh.png"),
                // 默认展示添加图片按钮
                require("../../../images/btn_add.png"),
            ]
        };
    }

    selectPhotoTapped = () => {

        const options = {
            title: '请选择',
            quality: 0.8,
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: true,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        // 直接调用相册
        try {

            ImagePicker.launchImageLibrary(options, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    let source = {uri: response.uri};
                    // You can   display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    this.setState({
                        avatarSource: source,
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    textareaChange = (text) => {
        console.log(text);
        this.setState({
            text: text
        })
    };

    componentDidMount() {

    }


    render() {
        let {images, text} = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Text style={styles.btnText}>取消</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text style={styles.btnText}>发布</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>

                    <Form>
                        <Textarea bordered
                                  onChangeText={this.textareaChange.bind(this)}
                                  rowSpan={5}
                                  value={this.state.text}
                                  bordered
                                  placeholder="请输入爆料内容"/>
                    </Form>

                    <View>

                        <Text>最多输入9张图片</Text>

                        <View style={styles.items}>
                            {
                                images.map((item, index) => {
                                    return <View style={styles.item}>
                                        <Image style={styles.itemImg} source={item}/>
                                        {
                                            index !== images.length - 1 ?
                                                <Button small transparent style={styles.delBtn}>
                                                    <Image style={styles.delIcon}
                                                           source={require('../../../images/icon_delete_small.png')}/>
                                                </Button> :
                                                null
                                        }
                                    </View>
                                })
                            }
                        </View>

                    </View>

                </Content>
            </Container>
        );
    }
}

export default Screen;
