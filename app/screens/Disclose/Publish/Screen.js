import React, {Component} from 'react';
import styles from './styles';
import {sliderWidth, itemWidth} from './styles';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Form,
    Textarea,
    Left, Body, Right,
} from "native-base";

import Spinner from 'react-native-loading-spinner-overlay';
import {View, Image, DeviceEventEmitter} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Carousel from 'react-native-snap-carousel';
import {$toast} from '../../../utils';
import * as navigationActions from 'app/actions/navigationActions';

import i18n from 'app/i18n';

// const btn_add_source = require("app/images/btn_add.png");

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreview: false,
            title: '',
            images: [
                // 默认展示添加图片按钮
                {
                    dataurl: require("app/images/btn_add.png"),
                    fileName: "btn_add.png"
                },
            ],
            activeSlide: 0,
            publishing: false
        }
    }

    selectPhotoTapped = () => {
        const options = {
            title: '请选择',
            quality: 0.2,
            mediaType: 'photo',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: false,
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

    addImage = () => {
        this.selectPhotoTapped();
    };

    handlePublish = (title, images) => {
        this.props.publish({
            title: title,
            images: images,
            userId: this.props.user.id || '',
            userName: this.props.user.name || '',
            callback: (data) => {
                if (data.success) {
                    let images = this.state.images.slice(-1);
                    this.setState({
                        images: images,
                        isPreview: false,
                        title: '',
                        activeSlide: 0,
                        publishing: false
                    });
                    DeviceEventEmitter.emit('updateDiscloseListData', 'unshift', data.data);
                    navigationActions.navigateToDiscloseList();
                }
            }
        });
    };

    // 发布爆料
    publish = () => {
        let title = this.state.title;
        if (!title) {
            $toast(i18n.t('disclose.publish_valid_textarea'));
            return;
        }
        // 添加loading
        this.setState({
            publishing: true
        });
        // 直接发布，没有选中图片
        if (this.state.images.length === 1) {
            this.handlePublish(title, []);
            return;
        }
        // 发布图片和文字
        let images = this.state.images.slice(0, this.state.images.length - 1);
        const formData = new FormData();
        images.forEach((file) => {
            formData.append('images', {
                uri: file.uri,
                name: file.fileName
            });
        });
        this.props.upload({
            images: formData,
            callback: (data) => {
                console.log(data);
                if (data.success) {
                    let uris = [];
                    data.data.forEach((item) => {
                        uris.push(item.uri);
                    });
                    this.handlePublish(title, uris);
                }
            }
        });
    };

    textareaChange = (text) => {
        this.setState({
            title: text
        })
    };

    renderImagePreview({item, index}) {
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
            this.setState({});
        }
    };

    // 放弃写爆料，返回爆料列表页面
    cancelWriteDisclose = () => {
        this.props.navigation.navigate('DiscloseList');
    };

    // 跳到用户首页
    goUserHome = () => {
        this.props.navigation.navigate('Mine');
    };


    componentDidMount() {

    };

    render() {

        let {images, isPreview, publishing} = this.state;
        let user = this.props.user;

        // 预览图片页面
        if (isPreview) {
            return <Container style={styles.carousel_container}>

                <Header style={styles.carousel_header}>
                    <Left>
                        <Button transparent onPress={this.preview2Publish}>
                            <Image style={styles.carousel_back_icon}
                                   source={require('app/images/icon_back_white.png')}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.previewDel}>
                            <Image style={styles.carousel_del_icon}
                                   source={require('app/images/icon_delete_white.png')}/>
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
                <Spinner
                    visible={publishing}
                    textContent={'Loading...'}
                    textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                />
                <Header style={styles.publish_header}>
                    <Left>
                        <Button transparent onPress={this.cancelWriteDisclose}>
                            <Text style={styles.btnText}>{i18n.t('disclose.cancel')}</Text>
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
                            <Text style={styles.btn_pubish_text}>{i18n.t('disclose.publish')}</Text>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {/******************* 间隔空白 ********************/}
                    <View style={styles.divider}/>
                    {/********************  文本域 ******************* */}
                    <Form style={styles.form}>
                        <Textarea
                            style={styles.textarea}
                            onChangeText={this.textareaChange.bind(this)}
                            rowSpan={5}
                            value={this.state.title}
                            placeholder=""/>
                    </Form>
                    <View>
                        <Text style={styles.imagesLabel}>{i18n.t('disclose.publish_input_tip')}</Text>
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
                                                               source={require('app/images/icon_delete_small.png')}/>
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
