import React, {Component} from 'react';
import styles from './styles';

import {
    Container,
    Header,
    Button,
    Spinner,
    Divider
} from "@components/NDLayout";

import {Col, Row, Grid} from "react-native-easy-grid";

import {
    Image,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    ActionSheetIOS
} from "react-native";

import {closeRNPage, goRNPage} from '@utils/CNNBridge';
import Carousel from "react-native-snap-carousel";
import FooterInput from '@components/FooterInput';
import CommentList from '@components/CommentList';
import Report from '@components/Report';
import {sliderWidth} from "./styles";
import {$toast, getNumByUserId, formatDate} from "@utils";
import avatars from "@services/constants";
import i18n from "@i18n";
import {Content} from '@components/NDLayout';
import discloseName from "@services/discloseName";
import FastImage from 'react-native-fast-image';

class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreview: false,
            activeSlide: 0,
            data: props.data,
            comments: [],
            isModalVisible: false,
            activeComment: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            loadMoreing: false,
            initLoading: true,
            placeholder: '',
            reasons: [],
            loadedAllData: false
        }
    }


    previewImage = (index) => {
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
                    <Image
                        style={styles.carousel_image}
                        source={{
                            uri: item
                        }}
                        resizeMode={'contain'}/>
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
        // 必须登录才能点赞
        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }
        // 调取键盘
        let username = item.user ? discloseName(item.user.id) : '';
        this.setState({
            activeComment: item,
            placeholder: `@${username}`
        })

    };

    // 评论
    comment = (item) => {
        // 必须登录才能点赞
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


    // 评论
    onComment = (item, text, completeCallback, failCallback) => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
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

        let {data} = this.state;

        let isReply = item && !item.images;
        this.props.commentDisclose({
            params: data,
            data: {
                // 评论者的user id
                "to_user_id": isReply ? item.user.id : data.user.id,
                // "to_user_name": isReply ? item.user.name : data.user.name,
                // 如果是回复，会带上所回复评论的id
                "reply_to": isReply ? item.id : '', // 如果是回复有值，如果是评论传空字符串
                "content": text
            },
            callback: (data) => {
                completeCallback(data);
                this.setState({
                    activeComment: null,
                });
                this.commentOk(data);
            }
        });


    };

    // 点赞

    like = (item) => {
        // 必须登录才能点赞
        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
            });
            return;
        }
        // 先在界面上更改点赞行为
        let like_count = item.disclose_stats.like_count;
        let actionValue = item.req_user_stats.like;
        item.req_user_stats.like = !actionValue;
        item.disclose_stats.like_count = !actionValue ? Number(like_count) + 1 : Number(like_count) - 1;

        this.setState({}, () => {
            if (!actionValue) {
                this.props.like({
                    params: item,
                    id: item.id
                })
            } else {
                this.props.cancel_like({
                    params: item,
                    id: item.id
                })
            }
        });

    };
    // 给评论点赞
    likeComment = (item) => {

        // 必须登录才能点赞
        // 必须登录才能点赞
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


    // 删除评论
    deleteComment = (item, index, fn) => {


        const {data} = this.state;

        let idx = this.state.comments.findIndex((it) => {
            return item.id === it.id;
        });

        this.state.comments.splice(idx, 1);

        data.disclose_stats.comment_count--;

        this.setState({
            data: {...data},
            activeComment: null,
            comments: this.state.comments.map(obj => ({...obj}))
        }, () => {
            this.props.deleteComment({
                data: item,
                params: data,
                callback: (data) => {
                    this.setState({})
                }
            });
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


    commentOk = (info) => {

        const {data} = this.state;
        let avatarType = getNumByUserId(this.props.user.id);

        this.state.comments.unshift(Object.assign(info, {
            source: avatars[avatarType % 5]
        }));

        data.disclose_stats.comment_count++;

        this.setState({
            data: {...data},
            comments: this.state.comments.map(obj => ({...obj})),
            placeholder: ''
        }, () => {

        });


    };

    /**
     * @desc 获取爆料详情
     * */
    getDiscloseDetail = () => {
        const {id} = this.props.data;
        // const id = navigation.getParam('id');
        // const id = '5cceb1d9786c5400018aea31';
        this.props.getDiscloseDetail({
            id: id,
            callback: (data) => {
                if (data && data.id) {
                    this.setState({
                        data: data
                    });
                }

            }
        });
    };

    /**
     * @desc   获取具体爆料id的评论列表
     * */
    getDiscloseComments = () => {
        const {id} = this.props.data;
        let {loadedAllData, LastEvaluatedKey} = this.state;
        this.props.getDiscloseComments({
            id: id,
            params: {
                count: 20,
                read_tag: LastEvaluatedKey
            },
            callback: (data) => {

                if (data.error) {
                    $toast(i18n.t('disclose_not_exist_tip'));
                    return;
                }


                let {comments} = this.state;
                let length = data.length;

                if (length !== 0) {
                    LastEvaluatedKey = data[length - 1] ? data[length - 1].id : '';
                }

                if (length < 20) {
                    loadedAllData = true;
                }

                data.forEach((item) => {
                    let avatarType = getNumByUserId(item.user.id);
                    item.source = avatars[avatarType % 5];
                });

                this.setState({
                    comments: [...comments, ...data],
                    LastEvaluatedKey: LastEvaluatedKey,
                    loadMoreing: false,
                    activeComment: null,
                    loadedAllData: loadedAllData
                });

            }
        });
    };


    // 显示删除弹框
    showDeleteDialog = () => {

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: [i18n.t('cancel'), i18n.t('delete')],
                cancelButtonIndex: 0,
                destructiveButtonIndex: 1,
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    this.props.deleteDisclose({
                        id: this.state.data.id,
                        callback: () => {
                            // this.props.navigation.pop();
                        }
                    });
                }
            }
        );

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

    closeReport = () => {
        this.setState({
            isModalVisible: false,
            reasons: []
        });
    };


    onSubmit = (text, fn) => {

        let reasons = this.state.reasons;
        this.props.report({
            params: this.state.data,
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

    componentDidMount() {
        this.getDiscloseDetail();
        this.getDiscloseComments();

    }

    render() {


        let {data, comments, isPreview, activeComment, loadMoreing, loadedAllData} = this.state;

        if (!data.id) {
            return null;
        }

        if (data) data.req_user_stats = data.req_user_stats || {};

        console.log(data);
        let avatarType = getNumByUserId(data.user.id);
        let source = avatars[avatarType % 5];
        // let userName = discloseName(data.user.id);

        let {user} = this.props;

        let isMyDisclose = false;
        if (data && user.id === data.userId) {
            isMyDisclose = true;
        }


        // 预览图片
        if (isPreview && data.id) {
            return <Container style={styles.carousel_container}>
                <Content style={styles.carousel_content}>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={data.images.slice(0, 9)}
                        renderItem={this.renderImagePreview}
                        sliderWidth={sliderWidth}
                        itemWidth={sliderWidth}
                        firstItem={this.state.activeSlide}
                        onBeforeSnapToItem={() => {

                        }}
                        onSnapToItem={(index) => {
                            this.setState({activeSlide: index})
                        }}
                    />
                </Content>
            </Container>;
        }

        // 展示详情
        return (
            <Container>
                <Header
                    title={""}
                    leftClick={() => {
                        closeRNPage();
                    }}
                    leftViewStyle={{
                        width: 30,
                        paddingVertical: 8
                    }}
                    styleBar={{
                        // paddingLeft: 6,
                    }}
                    style={{
                        backgroundColor: '#408EF5',
                        height: 44
                    }}/>

                <ScrollView>
                    {/*********************************************内容详情区域  start ********************************************/}
                    <Grid style={styles.grid_con}>
                        <Col style={styles.user_icon}>
                            <FastImage source={source} style={{
                                width: 30,
                                height: 30
                            }}/>
                        </Col>
                        <Col>
                            <Row>
                                <View style={styles.name}>
                                    <Text style={styles.userName}>{i18n.t('disclose.anonymous')}</Text>
                                    <Text
                                        style={styles.time}>{formatDate(data.created_at)}</Text>
                                </View>
                            </Row>
                            <Row>
                                <Text style={styles.col_title_text}>{data.title}</Text>
                            </Row>
                            {/* 九宫格图片 */}
                            <Row>
                                {
                                    (data.images || []).slice(0, 3).map((i, idx) => {
                                        return <Col key={idx + ''} style={styles.col_img}>
                                            <Button onPress={this.previewImage.bind(this, idx)}>
                                                {
                                                    <Image style={styles.image}
                                                           key={idx}
                                                           source={{
                                                               uri: i,
                                                           }}/>
                                                }
                                            </Button>
                                        </Col>
                                    })
                                }
                            </Row>
                            <Row>
                                {
                                    data.images && data.images.length > 3 ?
                                        data.images.slice(3, 6).map((i, idx) => {
                                            return <Col key={idx + ''} style={styles.col_img}>
                                                <Button
                                                    onPress={this.previewImage.bind(this, idx + 3)}>
                                                    {
                                                        <Image style={styles.image}
                                                               key={idx}
                                                               source={{
                                                                   uri: i,
                                                               }}/>
                                                    }

                                                </Button>

                                            </Col>
                                        }) : null
                                }
                            </Row>
                            <Row>
                                {
                                    data.images && data.images.length > 6 ?
                                        data.images.slice(6, 9).map((i, idx) => {
                                            return <Col key={idx + ''} style={styles.col_img}>
                                                <Button onPress={this.previewImage.bind(this, idx + 6)}>
                                                    {
                                                        <Image style={styles.image}
                                                               key={idx}
                                                               source={{
                                                                   uri: i,
                                                               }}/>
                                                    }
                                                </Button>
                                            </Col>
                                        }) : null
                                }
                            </Row>
                        </Col>
                    </Grid>
                    {/* 查看次数 */}
                    <Grid style={styles.viewNum}>
                        <Col style={{
                            width: 20
                        }}>
                            <Image style={{width: 15, height: 15}}
                                   source={require('@images/icon_view.png')}/>
                        </Col>
                        <Col style={{
                            width: 60
                        }}>
                            <Text style={styles.viewNum_text}>{data.disclose_stats.view_count}</Text>
                        </Col>
                        {/* 举报 */}
                        <Col style={{
                            alignItems: 'flex-end',
                            marginRight: 8
                        }}>
                            {
                                !isMyDisclose ? <TouchableOpacity
                                    onPress={this.showReportDialog.bind(this, data)} style={{
                                    width: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image style={{
                                        width: 12,
                                        height: 12
                                    }} source={require('@images/icon_report.png')}/>
                                    <Text style={{
                                        color: '#999999',
                                        fontSize: 12,
                                        lineHeight: 17,
                                        // width: 60,
                                        textAlign: 'center',
                                        marginLeft: 5
                                    }}>{i18n.t('report')}
                                    </Text>
                                </TouchableOpacity> : null
                            }

                        </Col>
                    </Grid>
                    <Divider/>
                    {/* 点赞、评论按钮等*/}
                    <Grid style={styles.btns}>
                        <Col style={styles.btns_btn_col}>
                            <Button transparent onPress={this.comment.bind(this, data)}>
                                <Image source={require('@images/icon_comment_big.png')}/>
                                <Text
                                    style={styles.btns_text}>{data.disclose_stats.comment_count || 0}</Text>
                            </Button>
                        </Col>
                        <Col style={styles.btns_btn_col}>
                            <Button transparent onPress={this.like.bind(this, data)}>
                                {
                                    !data.req_user_stats.like ?
                                        <Image
                                            source={require('@images/icon_like_big.png')}/> :
                                        <Image
                                            source={require('@images/icon_liked_big.png')}/>
                                }
                                <Text style={styles.btns_text}>{data.disclose_stats.like_count}</Text>
                            </Button>
                        </Col>
                    </Grid>
                    <Divider/>
                    {/*********************************************内容详情区域  end ********************************************/}

                    {/****************************评论列表 start****************************/}
                    {this.state.comments && this.state.comments.length > 0 ?
                        <CommentList data={data}
                                     user={user}
                                     comments={comments}
                                     loadedAllData={loadedAllData}
                                     loadMoreing={loadMoreing}
                                     deleteComment={this.deleteComment}
                                     loadMore={this.loadMore.bind(this)}
                                     likeComment={this.likeComment.bind(this)}
                                     reply={this.reply.bind(this)}/>
                        : null}
                    {/******************************评论列表 end*****************************/}

                </ScrollView>

                <View>
                    <Report
                        closeReport={this.closeReport}
                        reasons={this.state.reasons}
                        onSubmit={this.onSubmit}
                        isModalVisible={this.state.isModalVisible}
                        onSelect={this.onSelect}/>
                </View>

                {/* 底部评论框 */}
                <FooterInput
                    user={user}
                    isAnonymity={true}
                    placeholder={this.state.placeholder}
                    activeComment={activeComment}
                    onComment={this.onComment}
                />

            </Container>
        );
    }
}

export default Page;
