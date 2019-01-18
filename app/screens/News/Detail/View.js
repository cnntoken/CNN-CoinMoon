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
} from 'native-base';
import {Image,View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import WebContent from './components/WebContent';
import IconText from 'app/components/IconText';
import FooterInput from 'app/components/FooterInput';
import CommentList from 'app/components/CommentList';
import {$toast} from 'app/utils';
class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentLoading: true,
            activeComment: null,
            showOperateBox: false
        }
    }

    transformHtmlContent = (html,images=[])=>{
        if(!images.length){
            return html
        }
        html = html.replace(/<cnn-image\/>/ig,()=>{
            const src = images.shift();
            return `<img src='${src}'/>`
        }).replace(/<a.*?href=.*?>/ig,()=>{
            return `<a href="javascript:void 0">`
        })
        return html
    }
    // webview 加载完成, 显示操作按钮
    showOperate = ()=>{
        this.setState({
            showOperateBox: true
        })
    }
    // 评论
    comment = () => {
        // 调取键盘
        this.setState({
            activeComment: true,
        })
    }
    commentOk = ()=>{
        
    }
    // 评论
    onComment = (item, text, completeCallback) => {
        const {info} = this.state;
        // 如果传入的对象含有id则表明是回复评论
        if (item && item._id) {
            this.props.comment({
                params: {
                    content: text,
                    feedId: info._id,
                    atCommentId: item._id,
                    atUserId: item.userId
                },
                callback: (data) => {
                    completeCallback(data);
                    this.setState({
                        activeComment: null,
                    });
                    this.commentOk();
                }
            });
        } else {
            // 新增评论
            this.props.comment({
                params: {
                    content: text,
                    feedId: info._id
                },
                callback: (data) => {
                    completeCallback(data);
                    this.setState({
                        activeComment: null,
                    });
                    this.commentOk();
                }
            });
        }
    }

    /**
     * @desc 获取具体feed id的评论列表
     * */
    getCommentList = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('_id');
        this.props.getCommentList({
            id,
            params: {
                limit: 20,
                LastEvaluatedKey: this.state.LastEvaluatedKey
            },
            callback: (data) => {
                const {comments = []} = this.state;
                let {Items, LastEvaluatedKey} = data;
                this.setState({
                    comments: [...comments,...Items],
                    LastEvaluatedKey: LastEvaluatedKey,
                    loadMoreing: false,
                    activeComment: null
                });
            }
        });
    }

    getNews = (id,category)=>{
        this.props.getInfo({id,category},(info)=>{
            // console.log(info)
            info.content = this.transformHtmlContent(info.content,info.images);
            info.updatedAt = moment(info.updatedAt).format('YYYY.MM.DD HH:mm');
            this.setState({
                contentLoading: false,
                info
            },()=>{
                this.viewArticle(id)
            });
            
        })
    }

    // 回复评论
    replyComment = (item) => {
        console.log('回复评论', item);
        // 调取键盘
        this.setState({
            activeComment: item,
        })
    }

    deleteComment = (item)=>{
        this.props.deleteComment({
            id: item._id,
            callback: () => {
                $toast('删除评论成功');
            }
        });
    }

    loadMoreComment = () => {
        const {loadMoreing} = this.state;
        if (loadMoreing) {
            return false;
        }
        this.setState({
            loadMoreing: true
        });
        this.getCommentList();
    };

    likeComment = (item)=>{
        let actionValue = item.userAction.actionValue;
        item.userAction.actionValue = !actionValue;
        item.likeNum = !actionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
       
        // 更新用户对该资源的行为数据
        this.props.updateAction({
            _id: item.userAction._id,
            obj: {
                objectId: item._id,
                userId: this.props.userInfo.id,
                actionType: 1,  // 点赞
                objectType: 2,  // feed comment
                actionValue: !actionValue
            },
            callback: (data) => {
                $toast('点赞成功');
                if (!item.userAction._id) {
                    item.userAction._id = data._id;
                }
                this.setState({
                    comments: [...this.state.comments]
                });
            }
        });
    }
    
    likeArticle = ()=>{
        const {info} = this.state;
        let actionValue = info.userAction.actionValue;
        info.userAction.actionValue = !actionValue;
        info.likeNum = !actionValue ? info.likeNum + 1 : info.likeNum - 1;
        console.log('info', info)
        // 查询用户对该资源的行为数据
        this.props.updateAction({
            _id: info.userAction._id,
            obj: {
                objectId: info._id,
                userId: this.props.userInfo.id,
                actionType: 1,  // 点赞
                objectType: 1,   // feed
                actionValue: !actionValue
            },
            callback: (data) => {
                $toast('点赞成功');
                if (!info.userAction._id) {
                    info.userAction._id = data._id;
                }
                this.setState({});
            }
        });
    }
    viewArticle = (id)=>{
        this.props.updateAction({
            obj: {
                objectId: id,
                userId: this.props.userInfo.id,
                actionType: 3,  // 查看
                objectType: 1,   // feed
                actionValue: 1
            }
        });
    }
    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('_id');
        const category = navigation.getParam('category');
        this.getNews(id,category);
        this.getCommentList(id);
       
    }

    render() {
        const {contentLoading,info,activeComment,comments,loadMoreing,LastEvaluatedKey} = this.state;
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
                            <WebContent html={info.content} style={styles.webview} onReady={this.showOperate}/>
                            {this.state.showOperateBox &&  <View style={styles.viewBox}>
                                <IconText type='view' text={info.viewNum || 0}/>
                            </View>}
                           {
                               this.state.showOperateBox && <View style={styles.operateBox}>
                               <IconText type='comment_big' text={info.commentsNum || 0} vertical={true} onPress={this.comment}/>
                               <View style={{width: 74}}></View>
                               <IconText type={info.userAction.actionValue ? 'liked_big' : 'like_big'} text={info.likeNum || 0} vertical={true} onPress={this.likeArticle}/>
                           </View>
                           }
                            
                            {this.state.comments ?
                                        <CommentList data={info}
                                             comments={comments}
                                             loadedAllData={!LastEvaluatedKey}
                                             loadMoreing={loadMoreing}
                                             deleteComment={this.deleteComment}
                                             loadMore={this.loadMoreComment}
                                             likeComment={this.likeComment}
                                             reply={this.replyComment}
                                             />
                                : <Spinner color={'#408EF5'}/>
                                }
                        </View>
                    }
                </Content>
                 
                {/* 底部评论框 */}
                <FooterInput
                    activeComment={activeComment}
                    onComment={this.onComment}
                />
            </Container>
        );
    }
    goBack = ()=>{
        this.props.navigation.pop()
    }
}

export default ViewControl;
