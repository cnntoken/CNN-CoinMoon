import React, {PureComponent} from 'react';
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
    Label
} from "native-base";
import {Image, View, TouchableOpacity} from 'react-native';
import InputFocus from 'app/components/InputFocus';
import userService from 'app/services/user';
import styles from './styles';
import {$toast} from 'app/utils';
// import * as Types from 'app/actions/types'
import ImagePicker from 'react-native-image-crop-picker';

class ViewControl extends PureComponent {
    constructor(props) {
        super(props)
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
        let datas = [{
            data: image.data,
            mime: image.mime
        }];
        this.props.upload({
            images: datas,
            callback: (res) => {
                if (res) {
                    fn(res[0].uri)
                }
            }
        })
    };
    onSubmit = () => {
        $toast('正在提交...');
        this.uploadPicture(async (url) => {
            try {
                const res = await userService.updateAttributes({
                    'nickname': this.state.nick_name,
                    'picture': url
                });
                this.setState({
                    image: null
                });
                this.props.refreshInfo();
                this.props.navigation.pop();
                console.log(res);
                $toast('修改成功!');
            } catch (e) {
                console.log(e)
            }
        })

    }
    onChangeNickName = (nick_name) => {
        this.setState({
            nick_name
        })
    }
    selectPhotoTapped = () => {
        const options = {
            title: '请选择',
            quality: 1,
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
            ImagePicker.openPicker({
                // multiple: true,
                // width: 400,
                compressImageMaxWidth: 800,
                compressImageMaxHeight: 1800,
                // includeExif: true,
                includeBase64: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                maxFiles: 1,
            }).then(response => {
                let image = Object.assign(response, {dataUrl: `data:${response.mime};base64,${response.data}`});
                this.setState({image: image, needupload: true});
            });
        } catch (e) {
            console.log(e);
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
                </Header>
                <Content style={styles.content}>
                    <View style={styles.uploadbox}>
                        <TouchableOpacity onPress={this.selectPhotoTapped}>
                            <View style={styles.imgbox}>
                                <Image
                                    source={image && image.dataUrl ? {uri: image.dataUrl} : (avatar ? {uri: avatar} : require('app/images/avatar_default.png'))}
                                    style={{width: 80, height: 80}}/>
                                <Image source={require('app/images/icon_camera.png')} style={styles.camera}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infobox}>
                        <Label style={styles.label}>用户名</Label>
                        <InputFocus onChangeText={this.onChangeNickName} value={nick_name} style={styles.input}/>
                    </View>
                    <Button block full rounded style={styles.btn} onPress={this.onSubmit}>
                        <Text>保 存</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default ViewControl;
