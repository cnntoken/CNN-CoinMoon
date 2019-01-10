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
import {API} from 'aws-amplify';
import {Image, Text, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import FooterInput from './FooterInput';
import CommentList from './CommentList';
import {sliderWidth} from "../Publish/styles";
import Modal from "react-native-modal";
import {$toast} from "../../../utils";
import * as navigationActions from 'app/actions/navigationActions';

const source = require("../../../images/avatar_1.png");

class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreview: false,
            activeSlide: 0,
            data: null,
            comments: [],
            isModalVisible: false,
            activeComment: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            loadMoreing: false,
        }
    }

    // 放弃写爆料，返回爆料列表页面
    goListScreen = () => {
        navigationActions.navigateToDiscloseList();
    };

    previewImage = (index) => {
        console.log(index);
        this.setState({
            isPreview: true,
            activeSlide: index
        });
    };

    renderImagePreview({item}) {
        return (
            <View style={styles.carousel_slide}>
                <Image
                    source={{uri: item.uri}}
                    style={styles.carousel_image}
                />
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
        console.log('评论ddd', item, text);
        // 如果传入的对象不含有images字段，则是回复某条评论
        if (item && !item.images) {
            this.props.commentDisclose({
                params: {
                    content: text,
                    discloseId: item.discloseId,
                    atCommentId: item._id,
                    userId: "3ecd2ff0-f731-4faf-be97-f5e76abf69e7",
                    atUserId: item.userId,
                    "likeNum": 0,
                    "replayNum": 0,
                    "dislikeNum": 0
                },
                callback: (data) => {
                    if (data.success) {
                        completeCallback(data);
                        this.setState({
                            activeComment: null,
                        });
                        this.commentOk();
                    }
                }
            });
        }
        // 新增评论
        else {
            this.props.commentDisclose({
                params: {
                    content: text,
                    discloseId: this.state.data._id,
                    "userId": "3ecd2ff0-f731-4faf-be97-f5e76abf69e7",
                    "likeNum": 0,
                    "replayNum": 0,
                    "dislikeNum": 0
                },
                callback: (data) => {
                    console.log(data);
                    if (data.success) {
                        completeCallback(data);
                        this.setState({
                            activeComment: null,
                        });
                        this.commentOk();
                    }
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
        this.state.data.liked = true;
        this.state.data.likeNum = this.state.data.likeNum + 1;
        this.setState({});
        this.props.like({
            id: item._id,
            field: 'likeNum',
            callback: (data) => {
                console.log(data);
            }
        });
    };

    // 给评论点赞
    likeComment = (item) => {

        this.props.likeComment({
            id: item._id,
            field: 'likeNum',
            callback: (data) => {
                if (data.success) {
                    let index = this.state.comments.indexOf(item);

                    this.state.comments[index].liked = true;
                    this.state.comments[index].likeNum = item.likeNum + 1;

                    this.setState({
                        comments: [...this.state.comments],
                        activeComment: null
                    });
                }

            }
        });
    };


    // 删除评论
    deleteComment = (item) => {
        console.log('删除评论', item);
        this.props.deleteComment({
            id: item._id,
            callback: (data) => {
                // 删除成功
                if (data.success) {
                    // todo 国际化
                    $toast('删除爆料成功');
                    let index = this.state.comments.indexOf(item);
                    this.state.comments.splice(index, 1);
                    this.setState({
                        activeComment: null
                    });
                }
            }
        });
    };

    // loadmore 加载更多评论
    loadMore = (item) => {

        const {navigation} = this.props;
        const id = navigation.getParam('id');

        const {loadMoreing, LastEvaluatedKey} = this.state;

        if (loadMoreing) {
            return false;
        }

        if (!LastEvaluatedKey) {
            $toast('没有更多数据了!');
            return;
        }

        this.setState({
            loadMoreing: true
        });

        this.props.getDiscloseComments({
            id: id,
            params: {
                limit: 1,
                LastEvaluatedKey: this.state.LastEvaluatedKey
            },
            callback: (data) => {
                if (data.success) {
                    let {Items, LastEvaluatedKey} = data.data;
                    this.setState({
                        comments: [...this.state.comments, ...Items],
                        LastEvaluatedKey: LastEvaluatedKey,
                        activeComment: null,
                        loadMoreing: false
                    })
                }
            }
        });
    };

    commentOk = () => {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        this.props.getDiscloseComments({
            id: id,
            params: {
                limit: this.state.comments.length + 1,
                LastEvaluatedKey: null
            },
            callback: (data) => {
                if (data.success) {
                    let {Items, LastEvaluatedKey} = data.data;
                    this.setState({
                        comments: Items,
                        LastEvaluatedKey: LastEvaluatedKey,
                    })
                }
            }
        });
    };


    componentDidMount() {

        const {navigation} = this.props;
        const id = navigation.getParam('id');

        this.props.getDiscloseDetail({
            id: id,
            callback: (data) => {
                if (data.success) {
                    this.setState({
                        data: Object.assign(data.data, {
                            source: source
                        })
                    })
                }
            }
        });

        this.props.getDiscloseComments({
            id: id,
            params: {
                limit: 1,
                LastEvaluatedKey: this.state.LastEvaluatedKey
            },
            callback: (data) => {
                if (data.success) {
                    let {Items, LastEvaluatedKey} = data.data;
                    this.setState({
                        comments: Items,
                        LastEvaluatedKey: LastEvaluatedKey,
                    })
                }
            }
        });

    }


    // 显示删除弹框
    showDeleteDialog = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    // 确定删除
    confirmDelete = (item) => {
        this.props.deleteDisclose({
            id: item._id,
            callback: (data) => {
                // 删除成功
                if (data.success) {
                    // todo 国际化
                    $toast('删除爆料成功');
                    navigationActions.navigateToDiscloseList();
                }
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

        let {data, comments, isPreview, activeComment, loadMoreing} = this.state;

        // 预览九宫格图片
        if (isPreview && data) {
            let list = [data];
            return <Container style={styles.carousel_container}>

                <Header style={styles.carousel_header}>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image style={styles.carousel_back_icon}
                                   source={require('../../../images/icon_back_white.png')}/>
                        </Button>
                    </Left>
                </Header>

                <Content style={styles.carousel_content}>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={list[0].images.slice(0, 9)}
                        renderItem={this.renderImagePreview}
                        sliderWidth={sliderWidth}
                        // slideStyle={{width: sliderWidth}}
                        // containerCustomStyle={{flex: 1}}
                        itemWidth={sliderWidth}
                        firstItem={this.state.activeSlide}
                        onBeforeSnapToItem={(index) => {
                            console.log('onBeforeSnapToItem', index);
                            // this.setState({activeSlide: index})
                        }}
                        onSnapToItem={(index) => {
                            console.log('onSnapToItem', index);
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
                                   source={require('../../../images/icon_back_white.png')}/>
                        </Button>
                    </Left>
                    <Body/>
                    <Right>
                        <Button transparent light onPress={this.showDeleteDialog}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('../../../images/icon_more_white.png')}/>
                        </Button>
                    </Right>
                </Header>

                {
                    data ? (<Content>

                        <View>
                            {/***********************内容详情区域  start**********************/}
                            <View style={styles.divider}>
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
                                                    <Col style={styles.col_username}>
                                                        <Text
                                                            style={styles.col_username_text}>{item.userName}</Text>
                                                    </Col>
                                                    <Col style={styles.col_time}>
                                                        <Text style={styles.col_time_text}>{item.time}</Text>
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
                                                        item.images.slice(0, 3).map((i, idx) => {
                                                            return <Col style={styles.col_img}>
                                                                <Button onPress={this.previewImage.bind(this, idx)}>
                                                                    <Image style={styles.image} key={idx}
                                                                           source={{uri: i.uri}}/>
                                                                </Button>
                                                            </Col>
                                                        })
                                                    }
                                                </Row>

                                                <Row>
                                                    {
                                                        item.images.length > 3 ?
                                                            item.images.slice(3, 6).map((i, idx) => {
                                                                return <Col style={styles.col_img}>
                                                                    <Button
                                                                        onPress={this.previewImage.bind(this, idx + 3)}>
                                                                        <Image style={styles.image} key={idx}
                                                                               source={{uri: i.uri}}/>
                                                                    </Button>

                                                                </Col>
                                                            }) : null
                                                    }
                                                </Row>
                                                <Row>
                                                    {
                                                        item.images.length > 6 ?
                                                            item.images.slice(6, 9).map((i, idx) => {
                                                                return <Col style={styles.col_img}>
                                                                    <Button
                                                                        onPress={this.previewImage.bind(this, idx + 6)}>
                                                                        <Image style={styles.image} key={idx}
                                                                               source={{uri: i.uri}}/>
                                                                    </Button>
                                                                </Col>
                                                            }) : null
                                                    }
                                                </Row>
                                            </Grid>
                                            </Body>
                                        </ListItem>}
                                />
                                {/* 查看次数 */}
                                <Grid style={styles.viewNum}>
                                    <Col style={styles.viewNum_image}>
                                        <Image source={require('../../../images/icon_view.png')}/>
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
                                                        source={require('../../../images/icon_comment_big.png')}/>
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
                                                        !data.liked ?
                                                            <Image
                                                                source={require('../../../images/icon_like_big.png')}/> :
                                                            <Image
                                                                source={require('../../../images/icon_liked_big.png')}/>
                                                    }
                                                    <Text style={styles.btns_text}>{data.likeNum}</Text>
                                                </View>
                                            </Button>
                                        </View>
                                    </Col>
                                </Grid>
                            </View>
                            {/***********************内容详情区域 end********************** /}

                             {/****************************评论列表 start****************************/}
                            <CommentList data={data}
                                         comments={comments}
                                         deleteComment={this.deleteComment.bind(this)}
                                         loadMore={this.loadMore.bind(this)}
                                         likeComment={this.likeComment.bind(this)}
                                         reply={this.reply.bind(this)}/>
                            {loadMoreing ? <Spinner color={'#408EF5'}/> : null}
                            {/**************评论列表 end**************/}

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

                    </Content>) : <Content><Spinner color={'#408EF5'}/></Content>
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
