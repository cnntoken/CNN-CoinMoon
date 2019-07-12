import React, {Component} from 'react';
import styles from './styles';
import {
    View, 
    Text, 
    Image,
    DeviceEventEmitter
} from 'react-native';
import DiscussList from '@components/DiscussList'
import DiscussItem from '@components/DiscussItem'
import DiscussFooterInput from '@components/DiscussFooterInput'
import { goRNPage,closeRNPage, getCurrentUser } from '@utils/CNNBridge';

import {
    Container,
    Header,
    Content,
    Spinner
} from '@components/NDLayout'
import i18n from '@i18n';
import { calculateStyleVariable,cnnLogger } from '@utils/index'
const PX = calculateStyleVariable()

const LIMIT = 10
class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            coin_id: props.discussDetail.info.coin_id,
            activeComment: null,
            commentType: 'discuss_reply', // 默认type发布讨论
            netError: false,
            discussIndex: props.discussNativeInfo.index,
            user: props.user
        }
    }
    componentDidMount() {
        const {discussNativeInfo} = this.props
        const id = discussNativeInfo.id
        cnnLogger('discussion_detail_refresh',{
            discussion_id: id,
            pairs: discussNativeInfo.pairs
        })
        this.getDiscussDetail(id)
        this.userStateListener = DeviceEventEmitter.addListener('userStateChange',async()=>{
            const newUser = await getCurrentUser({});
            this.getDiscussDetail(id)
            this.setState({
                user: newUser
            })
        });
    }
    componentWillUnmount = () => {
        this.props.initDiscussDetail()
        this.userStateListener.remove()
    }
    getDiscussDetail = (discuss_id,successCallback,failCallback) => {
        this.setState({
            netError: false
        })
        this.props.getDiscussDetail({discuss_id,read_tag:'',count:LIMIT},()=>{
            successCallback && successCallback()
        },()=>{
            failCallback && failCallback()
            this.setState({
                netError: true
            })
        })
    }
    like_discuss = (id,count) => {
        let index = this.state.discussIndex
        let like_count = count
        this.props.likeDiscuss(id,()=>{
            DeviceEventEmitter.emit('discussDetailChange',{
                type: 'like',
                index,
                like_count,
                isLiked: true
            })
        })
    }
    cancel_like_discuss = (id,count) => {
        let index = this.state.discussIndex
        let like_count = count
        this.props.cancleLikeDiscuss(id,()=>{
            DeviceEventEmitter.emit('discussDetailChange',{
                type: 'cancel_like',
                index,
                like_count: like_count >=0 ? like_count : 0,
                isLiked: false
            })
        })
    }
    goBack = () => {
        // this.props.navigation.pop();
        closeRNPage()
    };
    clickComment = (item) => {
        let {user} = this.state
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            })
            return
        }
        this.setState({
            activeComment: item,
            placeholder: `@${item.user.name}`,
            commentType: 'discuss_reply',
            focusFromReply: true
        })
    }
    inputOnFocus = () => {
        let pos = 'input'
        if(this.state.focusFromReply){
            pos = 'reply'
        }
        cnnLogger('open_discussion_input',{
            pairs: this.props.discussNativeInfo.pairs,
            pos
        })
    }
    onComment = (item,text,cb) => {
        const {discussNativeInfo,discussDetail} = this.props
        const index = discussNativeInfo.index
        cnnLogger('submit_discussion',{
            pairs: discussNativeInfo.pairs
        })
        this.props.discussReply({discuss_id:discussDetail.discuss_id,content:text},()=>{
            cb()
            this.getDiscussDetail(discussDetail.discuss_id,()=>{
                let discussDetail = this.props.discussDetail
                DeviceEventEmitter.emit('discussDetailChange',{
                    type: 'comment',
                    index,
                    replies: discussDetail.info.replies
                })
            })
        })
    }
    resetActivecomment = () => {
        this.setState({
            activeComment: null,
            placeholder: `@${this.props.discussDetail.info.user.name}`,
            commentType: 'discuss_reply',
            focusFromReply: false
        })
    }

    render() {
        const { discussDetail } = this.props
        const { user } = this.state
        let { netError } = this.state
        return (
            <Container>
                <Header
                    style={styles.header_box}
                    leftClick={this.goBack} 
                    title={<Text style={{color:'#333'}}>{i18n.t('page_market_discuss_detail.all_discuss')}</Text>}
                    leftView={ <View style={{width: 40*PX, height:23*PX}}><Image source={require('@images/icon_back_black.png')} style={{width: 12*PX, height: 23*PX}}/></View>}
                >
                </Header>
                {
                    netError ? 
                        <View style={{flex:1}}><Text style={{textAlign:'center',paddingTop:20}}>{i18n.t('net_error')}</Text></View>
                    :   !discussDetail ||!discussDetail.discuss_id ? <Spinner/>
                    :   <View style={{flex:1}}>
                            <Content>
                                <View style={styles.main_discuss}>
                                    <DiscussItem
                                        hideBottomBorder={true}
                                        like_discuss={this.like_discuss}
                                        cancel_like_discuss={this.cancel_like_discuss}
                                        user={user}
                                        info={discussDetail.info}
                                        showViewAll={false}
                                        hideSubComment={true}
                                        clickComment={this.clickComment}
                                        hideDeleteIcon={true}
                                        action_button_style={{backgroundColor:'#fff'}}
                                        hideDiscussDetail={true}
                                    />
                                </View>
                                <View style={styles.replies_box}>
                                    <View style={styles.all_replies}>
                                        <Text>{i18n.t('page_market_discuss_detail.all_replies')}</Text>
                                    </View>
                                    <DiscussList
                                        style={styles.list}
                                        user={user}
                                        dataSource={discussDetail.info.replies||[]}
                                        // like_discuss={this.like_discuss}
                                        // cancel_like_discuss={this.cancel_like_discuss}
                                        hideAction={true}
                                        showViewAll={false}
                                        handleLoadMore={null}
                                        hideDiscussDetail={true}
                                    />
                                </View>
                            </Content>
                            <DiscussFooterInput 
                                coin_id={this.state.coin_id}
                                activeComment={this.state.activeComment}
                                onComment={this.onComment}
                                placeholder={`@${discussDetail.info.user.name}`}
                                resetActivecomment={this.resetActivecomment}
                                user={user}
                                pairs={this.props.discussNativeInfo.pairs}
                                onFocus={this.inputOnFocus}
                            />
                    </View>
                }
            </Container>
        );
    }
}

export default ViewControl;
