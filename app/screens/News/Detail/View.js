import React, {Component} from 'react';
// import styles from './styles';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Spinner
} from "native-base";
import {Image,View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import WebContent from './components/WebContent';
import IconText from 'app/components/IconText';

class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentLoading: true
        }
    }
    transformHtmlContent = (html,images=[])=>{
        if(!images.length){
            return html
        }
        html = html.replace(/<cnn-image\/>/ig,()=>{
            const src = images.shift();
            return `<img src='${src}'/>`
        })
        return html
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('_id');
        const category = navigation.getParam('category');
        this.props.getInfo({id,category},(info)=>{
            // console.log(info)
            info.content = this.transformHtmlContent(info.content,info.images);
            info.updatedAt = moment(info.updatedAt).format('YYYY.MM.DD HH:mm');
            this.setState({
                contentLoading: false,
                info
            })
        })
    }

    render() {
        const {contentLoading,info} = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_white.png')} style={{width:10,height:18}}/>
                        </Button>
                    </Left>
                </Header>
                <Content style={styles.wrap}>
                    {
                        contentLoading ? <Spinner color={'#408EF5'}/> :
                        <View style={styles.content}>
                            <Text style={styles.title}>{info.title}</Text>
                            <View style={styles.userBox}>
                                <Image source={{uri: info.user.picture}} style={styles.cavatar}/>
                                <Text style={styles.uname}>{info.user.nickname}</Text>
                                <Text style={styles.ctime}>{info.updatedAt}</Text>
                            </View>
                            <WebContent html={info.content} style={styles.webview}/>
                            <View style={styles.viewBox}>
                                <IconText type='view' text={info.viewNum || 0}/>
                            </View>
                            <View style={styles.operateBox}>
                                <IconText type='comment_big' text={info.commentNum || 0} vertical={true}/>
                                <View style={{width: 74}}></View>
                                <IconText type='like_big' text={info.likeNum || 0} vertical={true}/>
                            </View>
                        </View>
                    }
                </Content>
            </Container>
        );
    }
    goBack = ()=>{
        this.props.navigation.pop()
    }
}

export default ViewControl;
