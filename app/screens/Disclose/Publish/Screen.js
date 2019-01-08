import React, {Component} from 'react';
import styles from './styles';
import {sliderWidth, itemWidth} from './styles';
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

import {View, Image} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {JS} from "aws-amplify";
import {$toast} from '../../../utils';
// import {API} from 'aws-amplify';

// const btn_add_source = require("../../../images/btn_add.png");

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            isPreview: false,
            title: '',
            images: [
                // 默认展示添加图片按钮
                {
                    dataurl: require("../../../images/btn_add.png"),
                    fileName: "btn_add.png"
                },
            ],
            activeSlide: 0,
        }
    }

    selectPhotoTapped = () => {
        const options = {
            title: '请选择',
            quality: 0.1,
            mediaType: 'photo',
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
                // console.log('Response = ', response.type);
                // console.log(window.atob);
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    let source = Object.assign(response, {dataurl: 'data:image/png;base64,' + response.data});
                    this.state.images.splice(this.state.images.length - 1, 0, source);
                    this.setState({});
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    delImage = (item, index) => {
        console.log(item, index);
        this.state.images.splice(index, 1);
        this.setState({});
    };

    previewImage = (item, index) => {
        console.log(item, index);
        this.setState({
            isPreview: true,
            activeSlide: index
        });
    };

    addImage = (item, index) => {
        // console.log('上传图片');
        this.selectPhotoTapped();
    };

    // 发布爆料
    publish = () => {
        let title = this.state.title;
        if (!title) {
            // TODO 国际化
            $toast(`请输入爆料内容`);
            return;
        }
        let images = this.state.images.slice(0, this.state.images.length - 1);

        let source = [];
        images.forEach((item) => {
            source.push({
                data: item.data,
                fileName: item.fileName
            })
        });
        this.props.upload({
            images: images,
            callback: (data) => {
                console.log(data);
                let uris = [];
                data.data.forEach((item) => {
                    uris.push(item.uri);
                });
                this.props.publish({
                    title: title,
                    images: uris,
                    callback: (data) => {
                        if (data.success) {
                            let images = this.state.images.slice(-1);
                            this.setState({
                                images: images,
                                avatarSource: null,
                                isPreview: false,
                                title: '',
                                activeSlide: 0,
                            })
                        }
                    }
                });
            }
        });
    };

    textareaChange = (text) => {
        // console.log(text);
        this.setState({
            title: text
        })
    };

    renderImagePreview({item, index}) {
        console.log('****', item);
        return (
            <View style={styles.carousel_slide}>
                <Image
                    source={{uri: item.dataurl}}
                    style={styles.carousel_image}
                />
            </View>
        );
    };

    // 从预览页面中返回发布页面
    preview2Publish = () => {
        this.setState({
            isPreview: false
        });
    };


    // 预览页中删除
    previewDel = () => {
        if (this.state.images.length > 1) {
            this.state.images.splice(this.state.activeSlide, 1);
            this.setState({
                // isPreview: false
            });
        }
    };

    // 放弃写爆料，返回爆料列表页面
    cancelWriteDisclose = () => {
        // console.log('写爆料');
        this.props.navigation.navigate('DiscloseList');
    };
    // 跳到用户首页
    goUserHome = () => {
        this.props.navigation.navigate('Mine');
    };

    componentDidMount() {
        // console.log("hhhh");
    };

    render() {

        let {images, title, isPreview} = this.state;
        let user = this.props.user;

        // 预览图片页面
        if (isPreview) {
            return <Container style={styles.carousel_container}>

                <Header style={styles.carousel_header}>
                    <Left>
                        <Button transparent onPress={this.preview2Publish}>
                            <Image style={styles.carousel_back_icon}
                                   source={require('../../../images/icon_back_white.png')}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.previewDel}>
                            <Image style={styles.carousel_del_icon}
                                   source={require('../../../images/icon_delete_white.png')}/>
                        </Button>
                    </Right>
                </Header>

                <Content style={styles.carousel_content}>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={images.slice(0, images.length - 1)}
                        renderItem={this.renderImagePreview}
                        sliderWidth={sliderWidth}
                        // slideStyle={{width: sliderWidth}}
                        // containerCustomStyle={{flex: 1}}
                        itemWidth={sliderWidth}
                        firstItem={this.state.activeSlide}
                        onBeforeSnapToItem={(index) => {
                            console.log('onBeforeSnapToItem', index);
                            // this.setState({activeSlide: index})
                        }}
                        onSnapToItem={(index) => {
                            console.log('onSnapToItem', index);
                            this.setState({activeSlide: index})
                        }}
                    />
                </Content>
            </Container>;
        }

        // 上传图片
        return (
            <Container>
                <Header style={styles.publish_header}>
                    <Left>
                        <Button transparent onPress={this.cancelWriteDisclose}>
                            <Text style={styles.btnText}>取消</Text>
                        </Button>
                    </Left>
                    <Body>
                    {/* 人物头像 */}
                    <Button transparent onPress={this.goUserHome}>
                        <Image style={styles.user_icon} source={{uri: user.icon}}/>
                        <Text style={styles.btnText}>{user.name}</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.publish}>
                            <Text style={styles.btn_pubish_text}>发布</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form>
                        <Textarea bordered
                                  onChangeText={this.textareaChange.bind(this)}
                                  rowSpan={5}
                                  value={this.state.title}
                                  placeholder="请输入爆料内容"/>
                    </Form>
                    <View>
                        <Text>最多输入9张图片</Text>

                        <View style={styles.items}>
                            {
                                images.map((item, index) => {
                                    return <View>
                                        {
                                            index !== images.length - 1 ?
                                                <View style={styles.item}>
                                                    <Button onPress={this.previewImage.bind(this, item, index)}>
                                                        <Image style={styles.itemImg} source={{uri: item.dataurl}}/>
                                                    </Button>
                                                    < Button small onPress={this.delImage.bind(this, item, index)}
                                                             transparent
                                                             style={styles.delBtn}>
                                                        <Image style={styles.delIcon}
                                                               source={require('../../../images/icon_delete_small.png')}/>
                                                    </Button>
                                                </View> :
                                                <View style={styles.item}>
                                                    <Button onPress={this.addImage.bind(this, item, index)}>
                                                        <Image style={styles.itemImg} source={item.dataurl}/>
                                                    </Button>
                                                </View>
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
