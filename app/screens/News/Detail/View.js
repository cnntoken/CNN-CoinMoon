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
import {Image, View, SafeAreaView} from 'react-native';
import styles from './styles';
import moment from 'moment';
import WebContent from './components/WebContent';
import IconText from 'app/components/IconText';
import FooterInput from 'app/components/FooterInput';
import CommentList from 'app/components/CommentList';
import {$toast, getNumByUserId} from 'app/utils';
import i18n from 'app/i18n';
import avatars from "../../../services/constants";

class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentLoading: true,
            activeComment: null,
            showOperateBox: false,
            comments: [],
            placeholder: ''
        }
    }

    transformHtmlContent = (html, images = []) => {
        if (!images.length) {
            return html
        }
        html = html.replace(/<cnn-image\/>/ig, () => {
            const src = images.shift();
            return `<img src='${src}'/>`
        }).replace(/<a.*?href=.*?>/ig, () => {
            return `<a href="javascript:void 0">`
        })
        return html
    }
    // webview 加载完成, 显示操作按钮
    showOperate = () => {
        this.setState({
            showOperateBox: true
        })
    }
    // 评论
    comment = (item) => {
        // 调取键盘
        this.setState({
            activeComment: item,
        })
    };

    commentOk = (data) => {
        this.state.comments.unshift(Object.assign(data, {
            userAction: {
                objectId: data._id,
                userId: this.props.user.id,
                actionType: 1,  // 点赞
                objectType: 2,
                actionValue: false
            },
            user: this.props.user,
            source: this.props.user && this.props.user.picture ? {uri: this.props.user.picture} : require('app/images/avatar_default.png')
        }));
        this.setState({
            comments: JSON.parse(JSON.stringify(this.state.comments)),
            placeholder: ''
        });
    };

    // 评论
    onComment = (item, text, completeCallback) => {
        // todo 跳往登录页面
        if (!this.props.user.id) {
            $toast(i18n.t('disclose.needloginTocomment'));
            return;
        }

        if (!text) {
            $toast(i18n.t('comment.isNull'));
            return;
        }

        if (text && text.length > 1000) {
            $toast(i18n.t('disclose.tooLong'));
            return;
        }

        const {info} = this.state;
        // 如果传入的对象含有id则表明是回复评论
        if (item && !item.images) {
            this.props.comment({
                params: {
                    content: text,
                    at: item.user['nickname'],
                    atContent: item.content,
                    feedId: info._id,
                    atCommentId: item._id,
                    atUserId: item.userId,
                    userId: this.props.user.id,
                    "likeNum": 0,
                    "replayNum": 0,
                    "dislikeNum": 0
                },
                callback: (data) => {
                    completeCallback(data);
                    this.setState({
                        activeComment: null,
                    });
                    this.commentOk(data);
                }
            });
        } else {
            // 新增评论
            this.props.comment({
                params: {
                    content: text,
                    feedId: info._id,
                    "userId": this.props.user.id,
                    "likeNum": 0,
                    "replayNum": 0,
                    "dislikeNum": 0
                },
                callback: (data) => {
                    completeCallback(data);
                    this.setState({
                        activeComment: null,
                    });
                    this.commentOk(data);
                }
            });
        }
    };

    /**
     * @desc 获取具体feed id的评论列表
     * */
    getCommentList = () => {
        const {navigation} = this.props;
        const id = navigation.getParam('_id');
        this.props.getCommentList({
            id,
            params: {
                limit: 20,
                LastEvaluatedKey: this.state.LastEvaluatedKey,
                userId: this.props.userInfo.id,
            },
            callback: (data) => {
                const {comments = []} = this.state;
                let {Items, LastEvaluatedKey} = data;
                Items.forEach((item) => {
                    item.userAction = item.userAction || {};
                    item.user = item.user || {};
                    item.source = item.user && item.user.picture ? {uri: item.user.picture} : require('app/images/avatar_default.png');
                });
                this.setState({
                    comments: [...comments, ...Items],
                    LastEvaluatedKey: LastEvaluatedKey,
                    loadMoreing: false,
                    activeComment: null
                });

            }
        });
    };

    getNews = (id, category) => {
        this.props.getInfo({id, category}, (info) => {
            info.content = this.transformHtmlContent(info.content, info.images);
            info.updatedAt = moment(info.updatedAt).format('YYYY.MM.DD HH:mm');
            info.source = info.user && info.user.picture ? {uri: info.user.picture} : require('app/images/avatar_default.png');
            this.setState({
                contentLoading: false,
                info
            }, () => {
                this.viewArticle(id)
            });
        })
    };

    // 回复评论
    replyComment = (item) => {
        console.log('回复评论', item);
        // 调取键盘
        this.setState({
            activeComment: item,
            placeholder: `@${item.user['nickname']}`
        })
    };

    deleteComment = (item) => {
        this.props.deleteComment({
            id: item._id,
            callback: () => {
                $toast('删除成功');
                let index = this.state.comments.indexOf(item);
                this.state.comments.splice(index, 1);
                this.setState({
                    activeComment: null
                });
            }
        });
    };

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

    likeComment = (item) => {
        let actionValue = item.userAction.actionValue;
        item.userAction.actionValue = !actionValue;
        item.likeNum = !actionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
        this.setState({
            comments: JSON.parse(JSON.stringify(this.state.comments))
        });
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
                // $toast('点赞成功');
                if (!item.userAction._id) {
                    item.userAction._id = data._id;
                }
                this.setState({
                    comments: [...this.state.comments]
                });
            }
        });
    };

    likeArticle = () => {

        const {navigation} = this.props;
        const category = navigation.getParam('category');

        const {info} = this.state;

        let actionValue = info.userAction.actionValue;
        info.userAction.actionValue = !actionValue;
        info.likeNum = !actionValue ? info.likeNum + 1 : info.likeNum - 1;

        this.setState({});

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
                if (!info.userAction._id) {
                    info.userAction._id = data._id;
                    this.setState({});
                }
                // 同步点赞数据到列表，防止返回时数据没有更新
                this.props.feedLike({
                    category: category,
                    params: info,
                    asyncList: true
                });

            }
        });
    };

    viewArticle = (id) => {
        this.props.updateAction({
            obj: {
                objectId: id,
                userId: this.props.userInfo.id,
                actionType: 3,  // 查看
                objectType: 1,   // feed
                actionValue: 1
            }
        });
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('_id');
        const category = navigation.getParam('category');
        this.getNews(id, category);
        this.getCommentList(id);
    }

    render() {
        const {contentLoading, info, activeComment, comments, loadMoreing, LastEvaluatedKey} = this.state;
        const {user} = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image source={require('app/images/icon_back_white.png')} style={{width: 10, height: 18}}/>
                        </Button>
                    </Left>
                </Header>
                <Content style={styles.wrap}>
                    {
                        contentLoading ? <Spinner color={'#408EF5'}/> :
                            <View style={styles.content}>
                                <Text style={styles.title}>{info.title}</Text>
                                <View style={styles.userBox}>
                                    <Image source={info.source} style={styles.cavatar}/>
                                    <Text style={styles.uname}>{info.user.nickname}</Text>
                                    <Text style={styles.ctime}>{info.updatedAt}</Text>
                                </View>
                                <WebContent html={info.content} style={styles.webview} onReady={this.showOperate}/>

                                {this.state.showOperateBox && <View style={styles.viewBox}>
                                    <IconText type='view' text={info.viewNum || 0}/>
                                </View>}

                                {
                                    this.state.showOperateBox && <View style={styles.operateBox}>
                                        <IconText type='comment_big' text={info.commentsNum || 0} vertical={true}
                                                  onPress={this.comment.bind(this, info)}/>
                                        <View style={{width: 74}}></View>
                                        <IconText type={info.userAction.actionValue ? 'liked_big' : 'like_big'}
                                                  text={info.likeNum || 0} vertical={true} onPress={this.likeArticle}/>
                                    </View>
                                }

                                {this.state.comments && this.state.comments.length > 0 ?
                                    <CommentList data={info}
                                                 showNickName={true}
                                                 comments={comments}
                                                 user={user}
                                                 loadedAllData={!LastEvaluatedKey}
                                                 loadMoreing={loadMoreing}
                                                 deleteComment={this.deleteComment}
                                                 loadMore={this.loadMoreComment}
                                                 likeComment={this.likeComment}
                                                 reply={this.replyComment}
                                    />
                                    : null
                                }
                            </View>
                    }
                </Content>

                {/* 底部评论框 */}
                <FooterInput
                    user={user}
                    isAnonymity={false}
                    placeholder={this.state.placeholder}
                    activeComment={activeComment}
                    onComment={this.onComment}
                />
            </Container>
        );
    }

    goBack = () => {
        this.props.navigation.pop()
    }
}

export default ViewControl;
