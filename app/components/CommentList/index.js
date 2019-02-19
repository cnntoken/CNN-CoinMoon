import React, {Component} from 'react';
import styles from './styles';
import i18n from 'app/i18n'
import {
    Button,
    Left,
    Body,
    List,
    ListItem,
    Spinner,
    ActionSheet
} from "native-base";
import Modal from "react-native-modal";

import {Col, Row, Grid} from "react-native-easy-grid";

import {Image, Text, View, Keyboard, Platform} from "react-native";

import {formatDate} from "app/utils";
import FastImage from 'react-native-fast-image'


// import avatars from "../../../services/constants";

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
    deleteComment = (item) => {
        // this.cacheDeleteItem = item;
        // 国际化
        console.log(item);
        ActionSheet.show(
            {
                // options: [i18n.t('cancel'), i18n.t('delete')],
                options: Platform.OS === 'ios' ? [i18n.t('cancel'), i18n.t('delete')] : [
                    {
                        text: i18n.t('cancel'),
                        icon: "close",
                        iconColor: "#333"
                    }, {
                        text: i18n.t('delete'),
                        icon: "trash",
                        iconColor: "#fa213b"
                    },
                ],
                cancelButtonIndex: 0,
                destructiveButtonIndex: 1,
                title: i18n.t('delete_comment_confirm')
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    if (this.props.deleteComment) {
                        this.props.deleteComment(item, () => {
                            console.log('删除成功');
                        });
                    }
                }
            }
        )
    };

    // cancelDelete = () => {
    //     this.setState({
    //         isModalVisible: false
    //     })
    // };
    //
    // confirmDelete = () => {
    //     this.setState({
    //         isModalVisible: false
    //     });
    //     if (this.props.deleteComment) {
    //         this.props.deleteComment(this.cacheDeleteItem);
    //     }
    // };

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
                source={require('app/images/icon_like_small.png')}/>
        } else {
            return <Image
                source={require('app/images/icon_liked_small.png')}/>
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
                    <View><Text style={{
                        textAlign: 'center',
                        color: '#666666',
                        fontSize: 14,
                        lineHeight: 17
                    }}>{i18n.t('no_comment')}</Text></View> :
                    <List
                        dataArray={comments}
                        renderRow={(item, idx) => {
                            const isMyComment = user.id === item.userId;
                            let username = item.user ? item.user['custom:disclose_name'] : '';
                            if (showNickName) {
                                username = item.user ? item.user['nickname'] : ''
                            }
                            return <ListItem key={item._id || idx} style={styles.listitem} avatar>
                                {/* 左侧图标 */}
                                <Left>
                                    <Button transparent light onPress={this.clickAvatar.bind(this, item)}>
                                        <Image
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20
                                            }}
                                            source={item.source}
                                            // resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </Button>
                                </Left>
                                <Body style={styles.comments_listitem_body}>
                                {/* 评论人，评论时间、评论内容*/}
                                <View style={styles.comments_container}>
                                    <View style={styles.comments}>
                                        <Text
                                            style={styles.comments_username}>{username}</Text>
                                        <Text style={styles.comments_content}>{item.content}</Text>
                                        <Text
                                            style={styles.comments_time}>{formatDate(item.createdAt)}</Text>
                                        {
                                            item.at ? <View style={styles.comments_at}>
                                                <Text
                                                    style={styles.comments_at_content}>@{item.at}: {item.atContent}</Text>
                                                <Text
                                                    style={styles.comments_at_time}>{formatDate(item.atTime)}</Text>
                                            </View> : null
                                        }
                                    </View>
                                </View>
                                {/* 回复，赞评论等 */}
                                <Grid>
                                    <Col style={{width: 90}}>
                                        <Button transparent light onPress={this.reply.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col style={{width: 14}}>
                                                    <Image
                                                        source={require('app/images/icon_comment_small.png')}/>
                                                </Col>
                                                <Col>
                                                    <Text
                                                        style={styles.comments_btn_text}>{i18n.t('reply_comment')}</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                    <Col style={{width: 90}}>
                                        <Button transparent light
                                                onPress={this.likeComment.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col style={{width: 14}}>
                                                    {
                                                        this.returnLikeBtnStatus(item.userAction.actionValue)
                                                    }
                                                </Col>
                                                <Col>
                                                    <Text
                                                        style={styles.comments_btn_text}>{i18n.t('like_comment')}</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                    {isMyComment ? <Col style={{width: 70}}>
                                        <Button transparent light
                                                onPress={this.deleteComment.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col>
                                                    <Text
                                                        style={styles.comments_btn_text}>{i18n.t('delete_comment')}</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col> : null}

                                </Grid>
                                </Body>
                            </ListItem>
                        }}/>
            }

            {/*加载更多评论按钮*/}
            <Grid style={styles.loadmore}>
                {loadMoreing ? <Spinner size={'small'} color={'#408EF5'}/> : loadMoreBtn}
            </Grid>


        </View>)
    }
}

export default CommentList;
