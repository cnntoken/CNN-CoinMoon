import React, {Component} from 'react';
import styles from './styles';
import {
    Container,
    Header,
    Content,
    Button,
    Left,
    Right,
    Body,
    List,
    Spinner,
    ListItem
} from "native-base";
import {Col, Row, Grid} from "react-native-easy-grid";
import {Image, Text, View, DeviceEventEmitter, TouchableWithoutFeedback} from "react-native";
import Carousel from "react-native-snap-carousel";
import FooterInput from 'app/components/FooterInput';
import CommentList from 'app/components/CommentList';
import {sliderWidth} from "../Publish/styles";
import Modal from "react-native-modal";
import {$toast} from "../../../utils";
import NavigationService from 'app/navigation/NavigationService';
import avatars from "../../../services/constants";
import i18n from "../../../i18n";

import FastImage from 'react-native-fast-image'

const moment = require('moment');

class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreview: false,
            activeSlide: 0,
            data: null,
            comments: null,
            isModalVisible: false,
            activeComment: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            loadMoreing: false,
            initLoading: true
        }
    }

    goListScreen = () => {
        NavigationService.goBack();
    };

    previewImage = (index) => {
        console.log(index);
        this.setState({
            isPreview: true,
            activeSlide: index
        });
    };

    renderImagePreview = ({item}) => {
        return (
            <View style={styles.carousel_slide}>
                <TouchableWithoutFeedback
                    onPress={this.goBack}>
                    <FastImage
                        style={styles.carousel_image}
                        source={{
                            uri: item,
                            priority: FastImage.priority.normal,

                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    };

    // 从预览页面中返回发布页面
    goBack = () => {
        this.setState({
            isPreview: false
        });
    };

    // 回复评论
    reply = (item) => {
        console.log('回复评论', item);
        // 调取键盘
        this.setState({
            activeComment: item,
        })

    };

    // 评论
    comment = (item) => {
        console.log('评论', item);
        // 调取键盘
        this.setState({
            activeComment: item,
        })
    };

    // 评论
    onComment = (item, text, completeCallback) => {
        // 如果传入的对象不含有images字段，则是回复某条评论
        if (item && !item.images) {
            this.props.commentDisclose({
                params: {
                    content: text,
                    at: item.userId,
                    atUserId: item.userId,
                    atContent: item.content,
                    atTime: item.createdAt,
                    atCommentId: item._id,
                    discloseId: item.discloseId,
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
        }
        // 新增评论
        else {
            this.props.commentDisclose({
                params: {
                    content: text,
                    discloseId: this.state.data._id,
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

    onBlur = (item) => {

    };


    onFocus = (item) => {

    };

    // 点赞
    like = (item) => {
        // 必须登录才能点赞
        if (!this.props.user.id) {
            $toast(i18n.t('disclose.needlogin_tip'));
            return;
        }
        // 先在界面上更改点赞行为
        let actionValue = item.userAction.actionValue;
        item.userAction.actionValue = !actionValue;
        item.likeNum = !actionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
        this.setState({});

        // 更新爆料条目中的数据
        this.props.like({
            id: item._id,
            field: 'likeNum',
            cancel: actionValue,
            callback: () => {
                DeviceEventEmitter.emit('updateDiscloseListData', 'update', item);
            }
        });
        // 更新用户对该资源的行为数据
        this.props.updateAction({
            _id: item.userAction._id,
            obj: {
                objectId: item._id,
                userId: this.props.user.id,
                actionType: 1,  // 点赞
                objectType: 3,   // 爆料资源
                actionValue: !actionValue
            },
            callback: (res) => {
            }
        });
    };
    // 给评论点赞
    likeComment = (item) => {
        // 必须登录才能点赞
        if (!this.props.user.id) {
            $toast(i18n.t('disclose.needlogin_tip'));
            return;
        }
        // 先在界面上更改点赞行为
        let postActionValue = !item.userAction.actionValue;
        item.userAction.actionValue = postActionValue;
        item.likeNum = postActionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
        this.setState({
            comments: JSON.parse(JSON.stringify(this.state.comments)),
            activeComment: null
        });

        this.props.likeComment({
            id: item._id,
            field: 'likeNum',
            cancel: !postActionValue,
            callback: (data) => {
            }
        });

        // 更新用户对该资源的行为数据
        this.props.updateAction({
            _id: item.userAction._id,
            obj: {
                objectId: item._id,
                userId: this.props.user.id,
                actionType: 1,  // 点赞
                objectType: 4,  // 爆料评论回复资源
                actionValue: postActionValue
            },
            callback: (res) => {
            }
        });
    };


    // 删除评论
    deleteComment = (item) => {
        console.log('删除评论', item);
        this.props.deleteComment({
            id: item._id,
            callback: (data) => {
                $toast('删除成功');
                let index = this.state.comments.indexOf(item);
                this.state.comments.splice(index, 1);
                this.setState({
                    activeComment: null
                });
            }
        });
    };

    // loadmore 加载更多评论
    loadMore = () => {
        const {loadMoreing} = this.state;
        if (loadMoreing) {
            return false;
        }
        this.setState({
            loadMoreing: true
        });
        this.getDiscloseComments();
    };

    commentOk = (data) => {
        this.state.comments.unshift(Object.assign(data, {
            userAction: {
                objectId: data._id,
                userId: this.props.user.id,
                actionType: 1,  // 点赞
                objectType: 4,  // 爆料评论回复资源
                actionValue: false
            }
        }));
        this.setState({
            comments: JSON.parse(JSON.stringify(this.state.comments))
        });
    };

    /**
     * @desc 获取爆料详情
     * */
    getDiscloseDetail = () => {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        this.props.getDiscloseDetail({
            id: id,
            userId: this.props.user.id,
            callback: (data) => {
                this.setState({
                    data: Object.assign(data, {
                        source: avatars[(data.avatarType || 0) % 5],
                        userName: data.userName || 'Anonymity',
                    })
                });
            }
        });
    };

    /**
     * @desc   获取具体爆料id的评论列表
     * */
    getDiscloseComments = (limit, refresh, initLoading) => {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        this.props.getDiscloseComments({
            id: id,
            params: {
                limit: limit || 1,
                LastEvaluatedKey: this.state.LastEvaluatedKey,
                userId: this.props.user.id,
            },
            callback: (data) => {
                let {Items, LastEvaluatedKey} = data;
                Items.forEach((item) => {
                    item.userAction = item.userAction || {};
                    item.time = item.createdAt || new Date();
                });
                this.setState({
                    comments: refresh ? [...Items] : [...(this.state.comments || []), ...Items],
                    LastEvaluatedKey: LastEvaluatedKey,
                    loadMoreing: false,
                    activeComment: null,
                });
                if (!LastEvaluatedKey && !initLoading) {
                    $toast('没有更多数据了!');
                }
            }
        });
    };

    componentDidMount() {
        this.getDiscloseDetail();
        this.getDiscloseComments(1, false, true);
    }

    // 显示删除弹框
    showDeleteDialog = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    // 确定删除
    confirmDelete = () => {
        this.props.deleteDisclose({
            id: this.state.data._id,
            callback: (data) => {
                // $toast('删除爆料成功');
                DeviceEventEmitter.emit('updateDiscloseListData', 'delete', this.state.data);
                this.props.navigation.pop();
            }
        });
    };

    // 取消删除
    cancelDelete = () => {
        this.setState({
            isModalVisible: false,
        })
    };

    render() {

        let {data, comments, isPreview, activeComment, loadMoreing, LastEvaluatedKey} = this.state;
        // 预览图片
        if (isPreview && data) {
            return <Container style={styles.carousel_container}>
                {/*<Header style={styles.carousel_header}>*/}
                {/*<Left>*/}
                {/*<Button transparent onPress={this.goBack}>*/}
                {/*<Image style={styles.carousel_back_icon}*/}
                {/*source={require('app/images/icon_back_white.png')}/>*/}
                {/*</Button>*/}
                {/*</Left>*/}
                {/*</Header>*/}
                <Content style={styles.carousel_content}>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={data.images.slice(0, 9)}
                        renderItem={this.renderImagePreview}
                        sliderWidth={sliderWidth}
                        // slideStyle={{width: sliderWidth}}
                        // containerCustomStyle={{flex: 1}}
                        itemWidth={sliderWidth}
                        firstItem={this.state.activeSlide}
                        onBeforeSnapToItem={(index) => {
                            // console.log('onBeforeSnapToItem', index);
                            // this.setState({activeSlide: index})
                        }}
                        onSnapToItem={(index) => {
                            // console.log('onSnapToItem', index);
                            this.setState({activeSlide: index})
                        }}
                    />
                </Content>
            </Container>;
        }


        // 展示详情
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goListScreen}>
                            <Image style={styles.carousel_back_icon}
                                   source={require('app/images/icon_back_white.png')}/>
                        </Button>
                    </Left>
                    <Body/>
                    <Right>
                        <Button transparent light onPress={this.showDeleteDialog}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('app/images/icon_more_white.png')}/>
                        </Button>
                    </Right>
                </Header>

                {
                    data ? (<Content>

                        <View>
                            {/***********************内容详情区域  start**********************/}
                            <View>
                                {/*****爆料详情区域****/}

                                <List
                                    dataArray={[data]}
                                    renderRow={item =>
                                        <ListItem style={styles.listitem} avatar>
                                            {/* 左侧图标 */}
                                            <Left>
                                                <Image source={item.source}/>
                                            </Left>
                                            {/* 用户名& 发布时间*/}
                                            <Body style={styles.listitem_body}>
                                            {/* item 标题 ， 用户 时间等 */}
                                            <Grid style={styles.grid_con}>
                                                <Row>
                                                    <Col>
                                                        <View style={styles.name}>
                                                            <Text style={styles.userName}>{item.userName}</Text>
                                                            <Text
                                                                style={styles.time}>{moment(item.createdAt).format('HH:MM')}</Text>
                                                        </View>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Text style={styles.col_title_text}>{item.title}</Text>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                            {/* 九宫格图片 */}
                                            <Grid style={styles.grid_images_btns}>
                                                <Row>
                                                    {
                                                        (item.images || []).slice(0, 3).map((i, idx) => {
                                                            return <Col style={styles.col_img}>
                                                                <Button onPress={this.previewImage.bind(this, idx)}>
                                                                    <FastImage style={styles.image}
                                                                               key={idx}
                                                                               source={{
                                                                                   uri: i,
                                                                                   priority: FastImage.priority.normal,
                                                                               }}/>
                                                                </Button>
                                                            </Col>
                                                        })
                                                    }
                                                </Row>
                                                <Row>
                                                    {
                                                        item.images && item.images.length > 3 ?
                                                            item.images.slice(3, 6).map((i, idx) => {
                                                                return <Col style={styles.col_img}>
                                                                    <Button
                                                                        onPress={this.previewImage.bind(this, idx + 3)}>
                                                                        <FastImage style={styles.image}
                                                                                   key={idx}
                                                                                   source={{
                                                                                       uri: i,
                                                                                       priority: FastImage.priority.normal,
                                                                                   }}/>
                                                                    </Button>

                                                                </Col>
                                                            }) : null
                                                    }
                                                </Row>
                                                <Row>
                                                    {
                                                        item.images && item.images.length > 6 ?
                                                            item.images.slice(6, 9).map((i, idx) => {
                                                                return <Col style={styles.col_img}>
                                                                    <Button
                                                                        onPress={this.previewImage.bind(this, idx + 6)}>
                                                                        <FastImage style={styles.image}
                                                                                   key={idx}
                                                                                   source={{
                                                                                       uri: i,
                                                                                       priority: FastImage.priority.normal,
                                                                                   }}/>
                                                                    </Button>
                                                                </Col>
                                                            }) : null
                                                    }
                                                </Row>
                                            </Grid>
                                            </Body>
                                        </ListItem>}
                                />

                                <View>
                                    {/* 查看次数 */}
                                    <Grid style={styles.viewNum}>
                                        <Col style={styles.viewNum_image}>
                                            <Image source={require('app/images/icon_view.png')}/>
                                        </Col>
                                        <Col>
                                            <Text style={styles.viewNum_text}>{data.viewNum}</Text>
                                        </Col>
                                    </Grid>
                                    <View style={styles.divider}/>
                                    {/* 点赞、评论按钮等*/}
                                    <Grid style={styles.btns}>
                                        <Col style={styles.btns_btn_col}>
                                            <View style={styles.btns_btn}>
                                                <Button block transparent light onPress={this.comment.bind(this, data)}>
                                                    <View>
                                                        <Image
                                                            source={require('app/images/icon_comment_big.png')}/>
                                                        <Text style={styles.btns_text}>{data.commentsNum}</Text>
                                                    </View>
                                                </Button>
                                            </View>
                                        </Col>
                                        <Col style={styles.btns_btn_col}>
                                            <View style={styles.btns_btn}>
                                                <Button block transparent light onPress={this.like.bind(this, data)}>
                                                    <View>
                                                        {
                                                            !data.userAction.actionValue ?
                                                                <Image
                                                                    source={require('app/images/icon_like_big.png')}/> :
                                                                <Image
                                                                    source={require('app/images/icon_liked_big.png')}/>
                                                        }
                                                        <Text style={styles.btns_text}>{data.likeNum}</Text>
                                                    </View>
                                                </Button>
                                            </View>
                                        </Col>
                                    </Grid>
                                    <View style={styles.divider}/>
                                </View>

                            </View>
                            {/***********************内容详情区域 end********************** /}

                             {/****************************评论列表 start****************************/}
                            {this.state.comments ?
                                <CommentList data={data}
                                             comments={comments}
                                             loadedAllData={!LastEvaluatedKey}
                                             loadMoreing={loadMoreing}
                                             deleteComment={this.deleteComment.bind(this)}
                                             loadMore={this.loadMore.bind(this)}
                                             likeComment={this.likeComment.bind(this)}
                                             reply={this.reply.bind(this)}/>
                                : <Spinner size={'small'} color={'#408EF5'}/>}
                            {/******************************评论列表 end*****************************/}
                        </View>

                        {/*************删除确认弹框modal***************/}
                        <View>
                            <Modal isVisible={this.state.isModalVisible}>
                                <View>
                                    <Button style={styles.modal_btn} block transparent light
                                            onPress={this.confirmDelete}>
                                        <Text style={styles.modal_btn_del_text}>删除</Text>
                                    </Button>
                                    <Button style={styles.modal_btn} block transparent light
                                            onPress={this.cancelDelete}>
                                        <Text style={styles.modal_btn_calcel_text}>取消</Text>
                                    </Button>
                                </View>
                            </Modal>
                        </View>

                    </Content>) : <Content><Spinner size={'small'} color={'#408EF5'}/></Content>
                }

                {/* 底部评论框 */}
                <FooterInput
                    activeComment={activeComment}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onComment={this.onComment}
                />

            </Container>
        );
    }
}

export default Page;
