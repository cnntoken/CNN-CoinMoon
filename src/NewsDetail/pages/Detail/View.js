import React, {Component} from 'react';

import {
    Container,
    Header,
} from '@components/NDLayout';

import {Image, View, Linking, TouchableOpacity, Text, ScrollView} from 'react-native';

import styles from './styles';
import moment from 'moment';
import FeedDetail from './feedDetail';
import IconText from '@components/IconText';
import FooterInput from '@components/FooterInput';
import CommentList from '@components/CommentList';
import {$toast, cloneByJson} from '@utils';
import {closeRNPage, goRNPage} from '@utils/CNNBridge';
import i18n from '@i18n';
import {Col, Grid, Row} from "react-native-easy-grid";
import Report from '@components/Report';
import FastImage from 'react-native-fast-image';

class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeComment: null,
            showOperateBox: false,
            comments: [],
            placeholder: '',
            reasons: [],
            isModalVisible: false,
            // read_tag
            LastEvaluatedKey: null,
            info: props.data,
            loadedAllData: false,
        }
    }


    // webview 加载完成, 显示操作按钮
    showOperate = () => {
        // this.setState({
        //     showOperateBox: true
        // })
    };

    // 评论
    comment = (item) => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }

        // 调取键盘
        this.setState({
            activeComment: item,
        })
    };

    commentOk = (data) => {

        const {info} = this.state;
        info.feed_stats.comment_count++;


        this.state.comments.unshift(Object.assign(data, {
            source: this.props.user && this.props.user.picture ? {uri: this.props.user.picture} : require('@images/avatar_default.png')
        }));

        this.setState({
            info: {...info},
            comments: this.state.comments.map(obj => ({...obj})),
            placeholder: ''
        }, () => {

        });
    };

    // 评论
    onComment = (item, text, completeCallback, failCallback) => {

        if (!this.props.user.isLogin) {

            goRNPage({
                moduleName: 'stark_login',
            });

            // this.setState({
            //     activeComment: null,
            // });

            failCallback && failCallback();
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

        this.setState({
            activeComment: null,
            placeholder: ''
        });

        const {info} = this.state;

        let isReply = item && !item.images;
        this.props.comment({
            params: info,
            data: {
                "to_user_id": isReply ? item.user.id : info.user.id,
                // 如果是回复，会带上所回复评论的id
                "reply_to": isReply ? item.id : '', // 如果是回复有值，如果是评论传空字符串
                "content": text
            },
            callback: (data) => {
                completeCallback && completeCallback(data.data);
                this.setState({
                    activeComment: null,
                });
                this.commentOk(data.data);
            }
        });
    };

    /**
     * @desc 获取具体feed id的评论列表
     * */
    getCommentList = (id) => {

        // const {navigation} = this.props;
        // let id = id || navigation.getParam('id');

        let {loadedAllData, LastEvaluatedKey} = this.state;

        this.props.getCommentList({
            id,
            params: {
                count: 20,
                read_tag: LastEvaluatedKey
            },
            callback: (data) => {
                const {comments = []} = this.state;
                let length = data.length;
                if (length !== 0) {
                    LastEvaluatedKey = data[length - 1].id
                }
                if (length < 20) {
                    loadedAllData = true;
                }

                data.forEach((item) => {
                    item.source = item.user && item.user.avatar ? {uri: item.user.avatar} : require('@images/avatar_default.png');
                });

                this.setState({
                    comments: cloneByJson([...comments, ...data]),
                    LastEvaluatedKey: LastEvaluatedKey,
                    loadedAllData: loadedAllData,
                    loadMoreing: false,
                    activeComment: null
                });

            }
        });

    };


    // 获取最新的数据，该请求会递增页面查看次数
    getLastedNews = (id, category) => {
        setTimeout(() => {
            this.props.getInfo({id, category}, (info) => {
            }, () => {
            })
        });
    };

    // 默认从缓存里面请求数据，但是请求完后仍然需要再去单独请求，以触发计数器,同步每条feed的信息
    getNews = (id, category) => {
        this.getLastedNews(id, category);
    };

    // 回复评论
    replyComment = (item) => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }

        // 调取键盘
        this.setState({
            activeComment: item,
            placeholder: `@${item.user.name}`
        })
    };

    clickAvatar = (item) => {
        this.props.navigation.navigate('OthersHome', {userInfo: item.user})
    };


    deleteComment = (item, index, fn) => {

        const {info} = this.state;
        info.feed_stats.comment_count--;

        let idx = this.state.comments.findIndex((it) => {
            return item.id === it.id;
        });

        this.state.comments.splice(idx, 1);

        this.setState({
            info: {...info},
            activeComment: null,
            comments: this.state.comments.map(obj => ({...obj}))
        }, () => {
            this.props.deleteComment({
                params: item,
                callback: (data) => {

                }
            });
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


        const {info} = this.state;
        this.getCommentList(info.id);

    };

    likeComment = (item) => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }

        const {comments} = this.state;

        let actionValue = item.like;
        item.like = !actionValue;

        this.setState({
            comments: comments.map(obj => ({...obj}))
        }, () => {
            if (!actionValue) {
                this.props.likeComment({
                    params: item
                })
            } else {
                this.props.cancel_likeComment({
                    params: item
                })
            }

        });

    };

    likeArticle = () => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }

        const {info} = this.state;
        let actionValue = info.req_user_stats.like;
        let like_count = info.feed_stats.like_count;

        info.req_user_stats.like = !actionValue;
        info.feed_stats.like_count = !actionValue ? like_count + 1 : like_count - 1;

        this.setState({
            info: cloneByJson(info)
        }, () => {
            // 取消点赞
            if (actionValue) {
                this.props.cancel_like_Feed({
                    category: info.category,
                    params: info
                });
            }
            // 点赞
            else {
                this.props.like_feed({
                    category: info.category,
                    params: info
                });
            }
        });
    };

    openSource = () => {
        const {info} = this.state;
        const url = info.source_url;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    // 展示举报dialog
    showReportDialog = (item) => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }

        this.setState({
            isModalVisible: true,
            reasons: []
        });
    };

    onSelect = (item) => {
        let reasons = this.state.reasons;
        let index = reasons.indexOf(item.value);
        if (index === -1) {
            reasons.push(item.value);
        } else {
            reasons.splice(index, 1);
        }
        this.state.reasons = [...new Set(reasons)];
        this.setState({})
    };


    closeReport = (item) => {
        this.setState({
            isModalVisible: false,
            reasons: []
        });
    };


    onSubmit = (text, fn) => {
        let reasons = this.state.reasons;
        this.props.report({
            params: this.state.info,
            data: {
                content: text,
                reasons: reasons
            },
            callback: (data) => {
                $toast(i18n.t('report_ok'));
            }
        });

        this.setState({
            isModalVisible: false,
            reasons: []
        });

        if (fn) {
            fn();
        }

    };

    goBack = () => {
        this.props.navigation.pop();
    };

    componentDidMount() {
        const {info} = this.state;
        this.getNews(info.id, info.category);
        this.getCommentList(info.id);
    }

    render() {

        const {info, activeComment, comments, loadMoreing, loadedAllData} = this.state;

        const {user} = this.props;

        // 容错
        if (info) info.req_user_stats = info.req_user_stats || {};

        // 图标
        const source = info.user && info.user.avatar ? {uri: info.user.avatar} : require('@images/avatar_default.png');

        if (!info.content) {
            return null;
        }

        return (
            <Container>
                <Header
                    title={""}
                    leftViewStyle={{
                        width: 30,
                        backgroundColor: "#eee",
                        paddingVertical: 8
                    }}
                    styleBar={{
                        // paddingLeft: 6,
                    }}
                    leftClick={() => {
                        closeRNPage();
                    }}
                    style={{
                        backgroundColor: '#408EF5',
                        height: 44,
                        // paddingTop: 16,
                        // paddingBottom: 16
                    }}/>
                <ScrollView>
                    <View style={styles.wrap}>
                        <View style={styles.content}>
                            <Text style={styles.title}>{info.title}</Text>
                            <View style={styles.userBox}>
                                <FastImage source={source} style={styles.cavatar}/>
                                <Text style={styles.uname}>{info.user.name}</Text>
                                <Text style={styles.ctime}>{moment(info.updatedAt).format('YYYY.MM.DD HH:mm')}  </Text>
                            </View>
                            <FeedDetail html={info.content}
                                        cover={info.cover}
                                        images={info.images}
                                        style={styles.webview}
                                        onReady={this.showOperate}/>
                            {/*原文链接*/}
                            <View style={styles.source}>
                                <Text style={styles.sourceUrl} onPress={this.openSource}>{info.source_url}</Text>
                            </View>
                        </View>

                        {/*查看次数，举报*/}
                        <View style={styles.viewBox}>
                            <Grid>
                                <Col style={{
                                    width: 100,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}>
                                    <View>
                                        <IconText type='view' text={info.feed_stats.view_count || 0}/>
                                    </View>
                                </Col>
                                <Col/>
                                <Col style={{
                                    // width: 50,
                                    alignItems: 'flex-end',
                                    // justifyContent: 'flex-end',
                                }}>
                                    <TouchableOpacity style={{
                                        width: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                    }} onPress={this.showReportDialog.bind(this, info)}>
                                        <Image style={{
                                            width: 12,
                                            height: 12,
                                            marginRight: 4,
                                        }} source={require('@images/icon_report.png')}/>
                                        <Text style={{
                                            color: '#999999',
                                            fontSize: 12,
                                            lineHeight: 17,
                                            // width: 30,
                                        }}>{i18n.t('report')}
                                        </Text>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </View>

                        {/* 点赞次数，评论次数 */}
                        <View style={styles.operateBox}>
                            <IconText type='comment_big'
                                      text={info.feed_stats.comment_count}
                                      vertical={true}
                                      onPress={this.comment.bind(this, info)}/>
                            <View style={{
                                width: 74
                            }}/>
                            <IconText type={info.req_user_stats.like ? 'liked_big' : 'like_big'}
                                      text={info.feed_stats.like_count || 0} vertical={true}
                                      onPress={this.likeArticle}/>


                        </View>


                        {/*评论次数*/}
                        {comments && comments.length > 0 ?
                            <CommentList data={info}
                                         showNickName={true}
                                         clickAvatar={this.clickAvatar}
                                         comments={comments}
                                         user={user}
                                         loadedAllData={loadedAllData}
                                         loadMoreing={loadMoreing}
                                         deleteComment={this.deleteComment}
                                         loadMore={this.loadMoreComment}
                                         likeComment={this.likeComment}
                                         reply={this.replyComment}
                            />
                            : null
                        }

                        {/*************删除确认弹框modal***************/}
                        <View>
                            <Report
                                closeReport={this.closeReport}
                                reasons={this.state.reasons}
                                onSubmit={this.onSubmit}
                                isModalVisible={this.state.isModalVisible}
                                onSelect={this.onSelect}/>
                        </View>

                    </View>
                </ScrollView>

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
}

export default ViewControl;
