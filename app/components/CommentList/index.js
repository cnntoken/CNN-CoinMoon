import React, {Component} from 'react';
import styles from './styles';
import {
    Button,
    Left,
    Body,
    List,
    ListItem, Spinner
} from "native-base";

import {Col, Row, Grid} from "react-native-easy-grid";

import {Image, Text, View, Keyboard} from "react-native";

import {$toast} from "app/utils";

const source = require("app/images/avatar_1.png");

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
        if (this.props.deleteComment) {
            this.props.deleteComment(item);
        }
    };

    // loadmore 加载更多评论
    loadMore = (item) => {
        if (this.props.loadMore) {
            this.props.loadMore(item);
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

        let {data, comments, loadMoreing, loadedAllData} = this.props;


        // 加载更多按钮
        let loadMoreBtn = !loadedAllData ?
            <Button style={styles.loadmore_btn} block transparent light
                    onPress={this.loadMore.bind(this, data)}>
                <Text style={styles.loadmore_btn_text}>加载更多评论</Text>
            </Button> : null;


        // 展示详情
        return (<View>
            {/*评论头部*/}
            <View style={styles.comments_header}>
                <Text style={styles.comments_header_text}>所有评论({comments.length})</Text>
            </View>
            {/*评论列表*/}
            {
                comments.length === 0 ?
                    <View><Text style={{
                        textAlign: 'center',
                        color: '#666666',
                        fontSize: 14,
                        lineHeight: 17
                    }}>暂无评论~</Text></View> :
                    <List
                        dataArray={comments}
                        renderRow={item =>
                            <ListItem style={styles.listitem} avatar>
                                {/* 左侧图标 */}
                                <Left>
                                    <Image source={item.avatar}/>
                                </Left>
                                <Body style={styles.comments_listitem_body}>
                                {/* 评论人，评论时间、评论内容*/}
                                <View style={styles.comments_container}>
                                    <View style={styles.comments}>
                                        <Text style={styles.comments_username}>{item.username}</Text>
                                        <Text style={styles.comments_content}>{item.content}</Text>
                                        <Text style={styles.comments_time}>{item.time}</Text>
                                        {
                                            item.at ? <View style={styles.comments_at}>
                                                <Text
                                                    style={styles.comments_at_content}>@{item.at}: {item.atContent}</Text>
                                                <Text
                                                    style={styles.comments_at_time}>{item.atTime}</Text>
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
                                                    <Text style={styles.comments_btn_text}>回复评论</Text>
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
                                                    <Text style={styles.comments_btn_text}>赞评论</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                    <Col style={{width: 70}}>
                                        <Button transparent light
                                                onPress={this.deleteComment.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col>
                                                    <Text style={styles.comments_btn_text}>删除评论</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                </Grid>
                                </Body>
                            </ListItem>}/>
            }
            {/*加载更多评论按钮*/}
            <Grid style={styles.loadmore}>
                {loadMoreing ? <Spinner color={'#408EF5'}/> : loadMoreBtn}
            </Grid>
        </View>)
    }
}

export default CommentList;
