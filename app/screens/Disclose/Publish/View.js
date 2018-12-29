import React, {Component} from 'react';
// import styles from './styles';
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
    Thumbnail,
    Footer
} from "native-base";

import ImagePicker from 'react-native-image-picker';


// import {API} from 'aws-amplify';


class View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null
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

    componentDidMount() {

    }


    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Button onPress={this.selectPhotoTapped.bind(this)}><Text>upload</Text></Button>
                    {
                        this.state.avatarSource === null ? (
                            <Text>Select a Photo</Text>
                        ) : (
                            <Thumbnail source={this.state.avatarSource}/>
                        )
                    }
                </Content>
            </Container>
        );
    }
}

export default View;
