import React, {Component} from 'react';
import styles from './styles';
import {
    View, 
    Text, 
    Image
} from 'react-native';
import DiscussList from '../components/DiscussList'
import DiscussItem from '../components/DiscussItem'
import FooterInput from '../components/FooterInput'
import { goRNPage } from '@utils/CNNBridge';

import {
    Container,
    Header,
    Content,
    Spinner
} from '@components/NDLayout'

const LIMIT = 10
class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            coin_id: props.discussDetail.info.coin_id,
            activeComment: null,
            commentType: 'discuss_reply', // 默认type发布讨论
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        this.getDiscussDetail(id)
    }
    componentWillUnmount = () => {
        this.props.initDiscussDetail()
    }
    getDiscussDetail = (discuss_id) => {
        this.props.getDiscussDetail({discuss_id,read_tag:'',count:LIMIT})
    }
    like_discuss = (id) => {
        this.props.likeDiscuss(id)
    }
    cancel_like_discuss = (id) => {
        this.props.cancleLikeDiscuss(id)
    }
    goBack = () => {
        this.props.navigation.pop();
    };
    clickComment = (item) => {
        let {user} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            })
            return
        }
        this.setState({
            activeComment: item,
            placeholder: `@${item.user.name}`,
            commentType: 'discuss_reply'
        })
    }
    onComment = (item,text,cb) => {
        const {discussDetail} = this.props
        this.props.discussReply({discuss_id:discussDetail.discuss_id,content:text},()=>{
            cb()
            this.getDiscussDetail(discussDetail.discuss_id)
        })
    }
    resetActivecomment = () => {
        this.setState({
            activeComment: null,
            placeholder: `@${this.props.discussDetail.info.user.name}`,
            commentType: 'discuss_reply'
        })
    }
    handleLoadMoreDiscuss = () => {

    }

    render() {
        const { user,discussDetail } = this.props
        if(!discussDetail||!discussDetail.discuss_id) return <Spinner />
        return (
            <Container>
                <Header 
                    style={styles.header_box} 
                    leftClick={this.goBack} 
                    title={()=><Text style={{color:'#333'}}>全部评论</Text>}
                    leftView={ <Image source={require('@images/icon_back_black.png')} style={{width: 12, height: 23}}/>}
                >
                </Header>
                <Content>
                    <View style={styles.main_discuss}>
                        <DiscussItem
                            like_discuss={this.like_discuss}
                            cancel_like_discuss={this.cancel_like_discuss}
                            user={user}
                            info={discussDetail.info}
                            showViewAll={false}
                            hideSubComment={true}
                            clickComment={this.clickComment}
                            hideDeleteIcon={true}
                        />
                    </View>
                    <View style={styles.replies_box}>
                        <View style={styles.all_replies}>
                            <Text>全部回复</Text>
                        </View>
                        <DiscussList
                            style={styles.list}
                            user={this.props.user}
                            dataSource={discussDetail.info.replies||[]}
                            like_discuss={this.like_discuss}
                            cancel_like_discuss={this.cancel_like_discuss}
                            hideAction={true}
                            showViewAll={false}
                            handleLoadMore={this.handleLoadMoreDiscuss}
                        />
                    </View>
                </Content>
                <FooterInput 
                    coin_id={this.state.coin_id}
                    activeComment={this.state.activeComment}
                    onComment={this.onComment}
                    placeholder={`@${discussDetail.info.user.name}`}
                    resetActivecomment={this.resetActivecomment}
                    user={this.props.user}
                />
            </Container>
        );
    }
}

export default ViewControl;
