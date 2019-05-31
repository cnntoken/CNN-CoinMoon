import React, {PureComponent} from 'react';
import {
    Container,
    Button,
} from "@components/NDLayout";
import {Image, View, TouchableOpacity, Text} from 'react-native';
import InputFocus from '@components/InputFocus';
import styles from './styles';
import {$toast} from '@utils';
import i18n from '@i18n';
import ImagePicker from 'react-native-image-crop-picker';
import {Grid, Row, Col} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image';
import {closeRNPage} from "@src/utils/CNNBridge";

class ViewControl extends PureComponent {

    constructor(props) {
        super(props);
        const {user} = props;
        this.state = {
            nick_name: user.nickname,
            avatar: user.picture,
            image: null
        }
    }

    getFiles() {
        let files = {};
        this.props.images.map((image, idx) => {
            let pathParts = image.path.split('/');
            files[`file_${idx}`] = {
                uri: image.path,
                type: image.mime,
                name: pathParts[pathParts.length - 1]
            }
        });
        return files;
    }

    onSubmit = () => {



        let {nick_name, image} = this.state;

        // 如果没有提交选项，则不用在提交
        if (!nick_name && !image) {
            return;
        }

        if (nick_name && nick_name.length > 12) {
            $toast(i18n.t('name_too_long'));
            return;
        }

        let formData = new FormData();

        if (image) {
            let files = {};
            files.uri = image.path;
            files.name = image.filename || Math.random().toString().split('.')[1];
            files.type = image.mime;
            formData.append('file', files);
            formData.append('type', 'image');
        }

        this.props.updateUserInfo({
            params: {
                name: nick_name,
            },
            user_id: this.props.user.id,
            file: image ? formData : null,
            callback: () => {
                closeRNPage();
            }
        })
    };


    onChangeNickName = (nick_name) => {
        this.setState({
            nick_name
        })
    };

    selectPhotoTapped = () => {
        // 直接调用相册
        try {
            ImagePicker.openPicker({
                // width: 400,
                forceJpg: true,
                compressImageMaxWidth: 400,
                compressImageMaxHeight: 400,
                // includeExif: true,
                includeBase64: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
                maxFiles: 1,
            }).then(response => {

                let image = Object.assign(response, {dataUrl: `data:${response.mime};base64,${response.data}`});
                this.setState({image: image});

            }).catch((e) => {
                if (e && e.code === 'E_PERMISSION_MISSING') {
                    $toast(i18n.t('no_access_photo'));
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    goBack = () => {
        closeRNPage();
    };

    render() {

        const {nick_name, avatar, image} = this.state;
        return (
            <Container>
                <Grid>
                    <Row style={{
                        marginHorizontal: 16,
                        height: 50,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Col>
                            <Button style={{
                                width: 10
                            }} transparent onPress={this.goBack}>
                                <Image source={require('@images/icon_back_black.png')} style={{width: 10, height: 18}}/>
                            </Button>
                        </Col>

                        <Col/>
                    </Row>

                    <Row style={{
                        marginHorizontal: 16,
                        height: 140,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={styles.uploadbox}>
                            <TouchableOpacity onPress={this.selectPhotoTapped}>
                                <View style={styles.imgbox}>
                                    <FastImage
                                        source={image && image.dataUrl ? {uri: image.dataUrl} : (avatar ? {uri: avatar} : require('@images/avatar_default.png'))}
                                        style={{width: 80, height: 80, borderRadius: 40, backgroundColor: '#eee'}}/>
                                    <Image source={require('@images/icon_camera.png')} style={styles.camera}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Row>

                    <Row style={{
                        marginHorizontal: 24,
                        height: 80,

                    }}>
                        <View style={styles.infobox}>
                            <Text style={styles.label}>{i18n.t('username')}</Text>
                            <InputFocus onChangeText={this.onChangeNickName} value={nick_name} style={styles.input}/>
                        </View>
                    </Row>

                    <Row style={{
                        marginHorizontal: 24,
                        // height: 56,
                        marginTop: 32,
                        // backgroundColor: '#333'
                    }}>
                        <Button style={styles.btn} onPress={this.onSubmit}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 18,
                                // height: '100%',
                                // backgroundColor: "#eee",
                                // width: '100%'
                            }}>{i18n.t('save')}
                            </Text>
                        </Button>
                    </Row>
                    <Row/>
                </Grid>
            </Container>
        );
    }
}

export default ViewControl;
