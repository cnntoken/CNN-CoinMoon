import React, {Component} from 'react';
import styles from './styles';
import i18n from '@i18n';
import discloseName from '@services/discloseName';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Spinner, Button} from "@components/NDLayout";
import {Image, Text, View, ActionSheetIOS} from "react-native";
import {formatDate, ActionSheet, cnnLogger} from "@utils";
import FastImage from 'react-native-fast-image';


class CommentList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isPreview: false,
            activeSlide: 0,
            data: null,
            comments: [],
            isModalVisible: false,
            activeComment: false,
            text: ''
        }
    }

    // 回复评论
    reply = (item) => {
        if (this.props.reply) {
            this.props.reply(item);
        }
    };

    // 给评论点赞
    likeComment = (item) => {
        if (this.props.likeComment) {

            this.props.likeComment(item);
        }
    };


    // 删除评论
    deleteComment = (item, index) => {


        cnnLogger('click_delete_comment', {
            feed_type: this.props.data.category ? this.props.data.category : 'disclose',
        });

        ActionSheet({
            options: [i18n.t('cancel'), i18n.t('delete')],
            cancelButtonIndex: 0,
            destructiveButtonIndex: 1,
            colors: ['#007AFF', '#FF3B30'],
            title: i18n.t('delete_comment_confirm')
        }, (buttonIndex) => {
            if (buttonIndex === 1) {
                if (this.props.deleteComment) {
                    this.props.deleteComment(item, index, () => {
                    });
                }
            }
        });
    };

    // loadmore 加载更多评论
    loadMore = (item) => {
        if (this.props.loadMore) {
            this.props.loadMore(item);
        }
    };

    // 点击用户头像
    clickAvatar = (item) => {
        if (this.props.clickAvatar) {
            this.props.clickAvatar(item);
        }
    };


    returnLikeBtnStatus = (isLike) => {
        if (!isLike) {
            return <Image
                source={require('@images/icon_like_small.png')}/>
        } else {
            return <Image
                source={require('@images/icon_liked_small.png')}/>
        }
    };


    componentDidMount() {
    }


    render() {


        let {data, comments, loadMoreing, loadedAllData, user, showNickName} = this.props;

        // 加载更多按钮
        let loadMoreBtn = !loadedAllData ?
            <Button style={styles.loadmore_btn} block transparent light
                    onPress={this.loadMore.bind(this, data)}>
                <Text style={styles.loadmore_btn_text}>{i18n.t('loadmore_comments')}</Text>
            </Button> : null;


        // 展示详情
        return (<View>

                {/*评论头部*/}
                <View style={styles.comments_header}>
                    <Text style={styles.comments_header_text}>{i18n.t('allComments')}</Text>
                </View>

                {/*评论列表*/}
                {
                    comments.length === 0 ?
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                color: '#666666',
                                fontSize: 14,
                                lineHeight: 17
                            }}>
                                {i18n.t('no_comment')}
                            </Text>
                        </View> :

                        comments.map((item, idx) => {

                            
                            const isMyComment = user.id === item.user.id;

                            item.req_user_stats = item.req_user_stats || {};

                            let username = item.user ? discloseName(item.user.id) : '';

                            if (showNickName) {
                                username = item.user ? item.user.name : ''
                            }
                            return (<Grid key={item.id || idx} style={{
                                marginHorizontal: 16,
                            }}>
                                {/* 左侧图标 */}
                                <Col style={{
                                    width: 40,
                                    marginRight: 5,
                                }}>
                                    <FastImage
                                        onPress={this.clickAvatar.bind(this, item)}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: '#eee'
                                        }}
                                        source={item.source}
                                    />
                                </Col>
                                <Col>
                                    {/* 评论人，评论时间、评论内容*/}
                                    <Grid style={styles.comments_container}>
                                        <Row>
                                            <Text style={styles.comments_username}>{username}</Text>
                                        </Row>
                                        <Row>
                                            <Text style={styles.comments_content}>{item.content}</Text>
                                        </Row>
                                        <Row>
                                            <Text style={styles.comments_time}>{formatDate(item.created_at)}</Text>
                                        </Row>
                                        {
                                            item.reply_to ? <Row>
                                                <View style={styles.comments_at}>
                                                    <Text
                                                        style={styles.comments_at_content}>@{item.reply_to.user&&item.reply_to.user.name}: {item.reply_to.content}</Text>
                                                    <Text
                                                        style={styles.comments_at_time}>{formatDate(item.reply_to.created_at)}</Text>
                                                </View>
                                            </Row> : null
                                        }
                                    </Grid>


                                    {/* 回复，赞评论，删除 */}
                                    <Grid style={{
                                        // marginVertical: 12,
                                        marginLeft: 2,
                                        marginTop: 12,
                                        marginBottom: 25,
                                    }}>
                                        <Col style={{width: 90, display: 'flex'}} onPress={this.reply.bind(this, item)}>
                                            <Grid style={{
                                                justifyContent: 'flex-start'
                                            }}>
                                                <Col style={{width: 15}}>
                                                    <Image source={require('@images/icon_comment_small.png')}/></Col>
                                                <Col>
                                                    <Text
                                                        style={styles.comments_btn_text}>{i18n.t('reply_comment')}</Text>
                                                </Col>
                                            </Grid>
                                        </Col>

                                        <Col style={{width: 90}} onPress={this.likeComment.bind(this, item)}>
                                            <Grid style={{
                                                justifyContent: 'flex-start'
                                            }}>
                                                <Col style={{width: 15}}>
                                                    {
                                                        this.returnLikeBtnStatus(item.like)
                                                    }
                                                </Col>

                                                <Col>
                                                    <Text
                                                        style={styles.comments_btn_text}>{i18n.t('like_comment')}</Text>
                                                </Col>
                                            </Grid>

                                        </Col>

                                        {/* 本人发的评论自己可以删除 */}
                                        {isMyComment ?
                                            <Col style={{width: 70}} onPress={this.deleteComment.bind(this, item, idx)}>
                                                <Text style={styles.comments_btn_text}>{i18n.t('delete_comment')}</Text>
                                            </Col> : null
                                        }
                                    </Grid>
                                </Col>
                            </Grid>)
                        })
                }

                {/*加载更多评论按钮*/}
                <Grid style={styles.loadmore}>
                    {loadMoreing ? <Spinner size={'small'} color={'#408EF5'}/> : loadMoreBtn}
                </Grid>

            </View>
        )
    }
}

export default CommentList;
