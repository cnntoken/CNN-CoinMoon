import React, {PureComponent} from 'react';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Body,
    Label
} from "native-base";
import {Image, View, TouchableOpacity} from 'react-native';
import InputFocus from 'app/components/InputFocus';
import userService from 'app/services/user';
import styles from './styles';
import {$toast} from 'app/utils';
import i18n from 'app/i18n';
// import * as Types from 'app/actions/types'
import ImagePicker from 'react-native-image-crop-picker';

class ViewControl extends PureComponent {
    constructor(props) {
        super(props);
        const {userInfo} = props;
        this.state = {
            nick_name: userInfo.attributes.nickname,
            avatar: userInfo.attributes.picture,
            needupload: false,
            image: null
        }
    }

    uploadPicture = async (fn) => {
        const {image} = this.state;
        let datas = [];
        if (image) {
            datas = [{
                data: image.data,
                mime: image.mime
            }];
        }
        this.props.upload({
            images: datas,
            callback: (res) => {
                if (res) {
                    let url = res[0] ? res[0].uri : '';
                    fn(url)
                }
            }
        })
    };


    onSubmit = () => {

        $toast(i18n.t('page_register.reging_tip'));

        this.uploadPicture(async (url) => {
            try {
                if (!this.state.nick_name) {
                    $toast('valid_user_isnull');
                }
                let obj = {
                    'nickname': this.state.nick_name,
                };
                if (url) {
                    obj = {
                        'nickname': this.state.nick_name,
                        'picture': url
                    }
                }
                const res = await userService.updateAttributes(obj);
                $toast(i18n.t('edit_ok'));
                this.setState({
                    image: null
                });
                this.props.refreshInfo();
                this.props.navigation.pop();
                // console.log(res);
            } catch (e) {
                console.log(e)
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
                // multiple: true,
                // width: 400,
                forceJpg: true,
                compressImageMaxWidth: 400,
                compressImageMaxHeight: 400,
                // includeExif: true,
                includeBase64: true,
                compressImageQuality: 0.3,
                mediaType: 'photo',
                maxFiles: 1,
            }).then(response => {
                console.log(response);
                let image = Object.assign(response, {dataUrl: `data:${response.mime};base64,${response.data}`});
                this.setState({image: image, needupload: true});
            });
        } catch (e) {
            // console.log(e);
            if(e && e.code === 'E_PERMISSION_MISSING'){
                $toast(i18n.t('no_access_photo'));
            }
        }
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    render() {
        const {nick_name, avatar, image} = this.state;
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_black.png')} style={{width: 10, height: 18}}/>
                        </Button>
                    </Left>
                    <Body/>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.uploadbox}>
                        <TouchableOpacity onPress={this.selectPhotoTapped}>
                            <View style={styles.imgbox}>
                                <Image
                                    source={image && image.dataUrl ? {uri: image.dataUrl} : (avatar ? {uri: avatar} : require('app/images/avatar_default.png'))}
                                    style={{width: 80, height: 80, borderRadius: 40}}/>
                                <Image source={require('app/images/icon_camera.png')} style={styles.camera}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infobox}>
                        <Label style={styles.label}>{i18n.t('username')}</Label>
                        <InputFocus onChangeText={this.onChangeNickName} value={nick_name} style={styles.input}/>
                    </View>
                    <Button block full rounded style={styles.btn} onPress={this.onSubmit}>
                        <Text>{i18n.t('save')}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default ViewControl;
