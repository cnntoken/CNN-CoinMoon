import React, {Component} from 'react';
import styles from './styles';
import {sliderWidth} from './styles';

import {
    Container,
} from "@components/NDLayout";

import Spinner from 'react-native-loading-spinner-overlay';
import {goRNPage, closeRNPage} from '@utils/CNNBridge';

import {cloneByJson, NoticeUpdateNativeList} from '@utils';
import * as Events from '@data/ListChangeEvent';

import {
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Text
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import Carousel from 'react-native-snap-carousel';
import {$toast} from '@utils';
import discloseName from '@services/discloseName';
import {Row, Grid, Col} from 'react-native-easy-grid';
import i18n from '@i18n';


const btn_img_soruce = {
    dataurl: require("@images/btn_add.png"),
    fileName: "btn_add.png",
    isPreview: 'no'
};

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreview: false,
            title: '',
            images: [
                btn_img_soruce
            ],
            activeSlide: 0,
            publishing: false
        }
    }

    selectPhotoTapped = () => {
        if (this.state.images.length > 9) {
            $toast(i18n.t('tooimages'));
            return;
        }
        // 直接调用相册
        try {
            let length = this.state.images.length;
            ImagePicker.openPicker({
                multiple: true,
                // width: 400,
                forceJpg: true,
                compressImageMaxWidth: 600,
                compressImageMaxHeight: 600,
                // includeExif: true,
                includeBase64: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
                maxFiles: 10 - length,
            }).then(images => {
                // console.log(images);
                // 如果大于9张图片 为了适配 Android
                if (images.length + this.state.images.length > 10) {
                    $toast(i18n.t('tooimages'));
                    return;
                }
                images.forEach((item) => {
                    item.dataurl = `data:${item.mime};base64,${item.data}`
                });
                this.state.images.splice(length - 1, 0, ...images);
                this.setState({});

            }).catch((e) => {
                if (e && e.code === 'E_PERMISSION_MISSING') {
                    $toast(i18n.t('no_access_photo'));
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    delImage = (item, index) => {
        if (this.state.images.length > 1) {
            this.state.images.splice(index, 1);
            this.setState({
                images: [...this.state.images]
            });
        }
    };

    previewImage = (item, index) => {
        // console.log(item, index);
        this.setState({
            isPreview: true,
            activeSlide: index
        });
    };

    addImage = () => {
        this.selectPhotoTapped();
    };

    handlePublish = (title, files) => {

        // 最大15s后去掉遮罩
        setTimeout(() => {
            this.setState({
                publishing: false
            });
        }, 15000);

        this.props.publish({
            title: title,
            files: files,
            user_name: discloseName(this.props.user.id || ''),
            callback: (data) => {
                if (data.error) {
                    $toast(i18n.t('publish_fail'));
                    this.setState({
                        publishing: false
                    });
                }

                let images = this.state.images.slice(-1);

                this.setState({
                    images: images,
                    isPreview: false,
                    title: '',
                    activeSlide: 0,
                    publishing: false
                }, () => {
                    // 通知已经更新到列表中
                    NoticeUpdateNativeList(Events.disclose_add, {data: cloneByJson(data)});
                });


            }
        });

    };

    // 发布爆料
    publish = () => {


        // 必须登录才能点赞
        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_news',
                params: {
                    initialRoute: 'OthersHome'
                }
            });
            return;
        }

        let title = this.state.title;
        if (!title) {
            $toast(i18n.t('disclose.publish_valid_textarea'));
            return;
        }
        // 添加loading
        this.setState({
            publishing: true
        });

        // 如果大于9张图片 (为了适配Android)
        let images = this.state.images.slice(0, this.state.images.length - 1);
        if (images.length > 9) {
            $toast(i18n.t('tooimages'));
            return;
        }

        let files = [];
        images.forEach((item) => {
            let formData = new FormData();

            let file = {};
            file.uri = item.path;
            file.name = item.filename || Math.random().toString().split('.')[1];
            file.type = item.mime;
            formData.append('file', file);
            formData.append('type', 'image');

            files.push(formData);
        });

        this.handlePublish(title, files);


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
        let activeSlide = this.state.activeSlide;
        console.log('*****', this.state.images, activeSlide, '*****');
        if (this.state.images.length > 1 && this.state.images[activeSlide].isPreview !== 'no') {
            this.state.images.splice(activeSlide, 1);
            if (this.state.images[0].isPreview === 'no') {
                this.preview2Publish();
            } else {
                this._carousel.snapToItem(activeSlide - 1 > 0 ? activeSlide - 1 : 0);
            }
            this.setState({
                images: [...this.state.images],
            }, () => {

            });
        }
    };

    // 放弃写爆料，返回爆料列表页面
    cancelWriteDisclose = () => {
        closeRNPage();
    };

    // 跳到用户首页
    goUserHome = () => {
    };


    componentDidMount() {

    }

    render() {

        let {images, isPreview, publishing, title} = this.state;
        let user = this.props.user;

        // 预览图片页面
        if (isPreview) {
            return <Container style={styles.carousel_container}>
                <Grid>
                    <Row style={{
                        height: 50,
                        alignItems: 'center',
                        marginHorizontal: 16,
                        justifyContent: 'space-between',
                    }}>
                        <Col style={{
                            width: 12,
                        }}>
                            <TouchableOpacity transparent onPress={this.preview2Publish}>
                                <Image style={styles.carousel_back_icon}
                                       source={require('@images/icon_back_white.png')}/>
                            </TouchableOpacity>
                        </Col>
                        <Col/>
                        <Col style={{
                            width: 24
                        }}>
                            <TouchableOpacity transparent onPress={this.previewDel}>
                                <Image style={styles.carousel_del_icon}
                                       source={require('@images/icon_delete_white.png')}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
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
                            enableMomentum={true}
                            onSnapToItem={(index) => {
                                // console.log('onSnapToItem', index);
                                this.setState({activeSlide: index});

                            }}
                        />
                    </Row>
                </Grid>
            </Container>;
        }

        // 上传图片
        return (
            <Container>
                <Spinner
                    visible={publishing}
                    textContent={i18n.t('disclose.publishing')}
                    textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                />
                <Grid>
                    <Row style={{
                        height: 44,
                        marginHorizontal: 16,
                        // // maxHeight: 44,
                        alignItems: 'center',
                        // flexDirection: 'row',
                        // // backgroundColor: '#333',
                        justifyContent: 'space-between',
                    }}>
                        <Col style={{
                            width: 80
                        }}>
                            <TouchableOpacity onPress={this.cancelWriteDisclose}>
                                <Text style={styles.btnText}>{i18n.t('disclose.cancel')}</Text>
                            </TouchableOpacity>
                        </Col>
                        {/* 人物头像 */}
                        <Col style={{
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Image
                                style={styles.user_icon}
                                source={user.disclose_avatar}
                            />
                            <Text style={styles.btnText}>{user.discloseName}</Text>
                        </Col>
                        <Col style={{
                            width: 80,
                            textAlign: 'right'
                        }}>
                            <TouchableOpacity onPress={this.publish}>
                                <Text style={styles.btn_pubish_text}>{i18n.t('disclose.publish')}</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    {/*分割线*/}
                    <Row style={styles.divider}/>

                    <Row style={{
                        height: 199
                    }}>
                        <View style={{
                            paddingHorizontal: 16,
                            paddingVertical: 15,
                            width: '100%',

                        }}>
                            <TextInput
                                placeholder={''}
                                onChangeText={this.textareaChange}
                                value={title}
                                multiline={true}
                                style={{
                                    height: 168,
                                    // borderWidth: 1,
                                    width: '100%',
                                }}/>
                        </View>
                    </Row>
                    <Row style={{
                        height: 20
                    }}>
                        <Text style={styles.imagesLabel}>{i18n.t('disclose.publish_input_tip')}</Text>
                    </Row>
                    <Row>
                        <View style={styles.items}>
                            {
                                images.map((item, index) => {
                                    return <View key={index}>
                                        {
                                            index !== images.length - 1 ?
                                                <View style={styles.item}>
                                                    <TouchableOpacity
                                                        style={styles.itemImgBox}
                                                        onPress={this.previewImage.bind(this, item, index)}>
                                                        <Image style={styles.itemImg} source={{uri: item.dataurl}}/>
                                                    </TouchableOpacity>
                                                    < TouchableOpacity onPress={this.delImage.bind(this, item, index)}
                                                                       transparent
                                                                       style={styles.delBtn}>
                                                        <Image style={styles.delIcon}
                                                               source={require('@images/icon_delete_small.png')}/>
                                                    </TouchableOpacity>
                                                </View> :
                                                <View style={styles.item}>
                                                    <TouchableOpacity onPress={this.addImage}>
                                                        <Image style={[styles.itemImg, {position: 'relative'}]}
                                                               source={item.dataurl}/>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                    </View>
                                })
                            }
                        </View>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default Screen;
