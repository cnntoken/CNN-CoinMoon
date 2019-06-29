import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    DeviceEventEmitter,
    PixelRatio
} from 'react-native';

import {
    Button,
    Spinner
} from "@components/NDLayout";
import * as Events from '@data/ListChangeEvent';


import PropTypes from 'prop-types';
import UserAvatar from './components/UserAvatar';
import i18n from '@i18n';
import RefreshListView, {RefreshState} from '@components/RefreshListView';
import AnimatedHeader from '@components/Collapsible';
import Item from "./components/feedItem/Item";
import {closeRNPage, goRNPage} from "@utils/CNNBridge";
import {cloneByJson, cnnLogger} from "@src/utils";

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F5F5F5'
    },
    head: {
        height: 119,
        backgroundColor: '#408EF5',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bg: {
        height: 55,
        backgroundColor: '#408EF5',
    },
    userInfo: {
        // height: 120,
        // backgroundColor: '#408EF5',
        // borderTopColor:'#408EF5',
        // borderTopWidth:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'space-between',
        // paddingBottom: 20
    },
    userInfo_other: {
        justifyContent: 'center',
        // marginTop: 8
    },
    userAvatar: {
        top: -40,
    },
    editBtn: {
        marginRight: 16,
        marginTop: 10,
        fontSize: 14
    },
    // 删除弹框
    modal_btn: {
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 15
    },
    modal_btn_del_text: {
        color: '#FF3B30'
    },
    modal_btn_calcel_text: {
        color: '#007AFF'
    },
});


class ViewControl extends Component {


    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loadMoreing: false,
            hasData: true,
            Items: null,
            activeItem: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            userId: '',
        };
    }


    // 点赞
    like = (item) => {

        // debugger;

        // 必须登录，否则跳往登录页
        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
                params:{
                    event:{
                        from: 'othersHome',
                        trigger: 'like',
                    }
                }
            });
            return;
        }

        let Items = cloneByJson(this.state.Items);
        let actionValue = item.req_user_stats.like;

        this.setState({
            Items
        }, () => {
            // 取消点赞
            if (actionValue) {
                this.props.cancel_like_Feed({
                    category: item.category,
                    params: item
                });
            }
            // 点赞
            else {
                this.props.like_feed({
                    category: item.category,
                    params: item
                });
            }
        });
    };

    goUserDetail = (info) => {

    };

    goDetail = (info) => {
        goRNPage({
            moduleName: 'stark_news_detail',
            params: {
                from: 'OthersHome',
                data: info
            }
        });
    };


    renderItem = ({item, index, separators, cat}) => {
        return <Item info={item}
                     key={item.id}
                     isShowDislikeDialog={false}
                     onLike={this.like.bind(item)}
                     onAvatarClick={this.goUserDetail.bind(this, item)}
                     onItemClick={this.goDetail}/>
    };

    //  下滑刷新
    handleRefresh = () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        this.getList(10, null, true, false);
    };

    // 上拉加载更多
    handleLoadMore = () => {
        if (this.state.loadMoreing) {
            return false;
        }
        this.setState({
            loadMoreing: true,
            refreshState: RefreshState.FooterRefreshing
        });
        this.getList(10, this.state.LastEvaluatedKey, false, true);
    };

    /**
     * 获取爆料列表数据和获取每条爆料条目对应用户的行为数据
     * @param limit 返回限制
     * @param LastEvaluatedKey 标识下一次请求从哪个条目开始
     * @param refresh      向下拉刷新
     * @param loadmore     加载更多
     * */
    getList = (limit, LastEvaluatedKey, refresh, loadmore) => {
        this.props.getList({
            params: {
                count: limit || 10,
                read_tag: LastEvaluatedKey || null,
                user_id: this.props.userInfo.id,
            },

            callback: (data) => {


                if (data && data.error) {
                    this.setState({
                        refreshState: RefreshState.Failure,
                    });
                    return;
                }

                let Items = data.data;

                let list = [];

                // 向下拉时，更新最新前面的数据
                if (refresh) {
                    list = [...Items]
                }
                // 加载更多
                else if (loadmore) {
                    list = [...this.state.Items, ...Items];
                } else {
                    list = [...Items]
                }

                let refreshState = RefreshState.Idle;
                if (list.length < 1) {
                    refreshState = RefreshState.EmptyData;
                }
                // 返回的数据少于10条，则说明没有更多数据
                if (Items.length < 10) {
                    refreshState = RefreshState.NoMoreData;
                }

                this.setState({
                    Items: list,
                    refreshState: refreshState,
                    LastEvaluatedKey: Items[Items.length - 1] ? Items[Items.length - 1].id : null,
                    loadMoreing: false,
                    refreshing: false,
                    initLoading: false
                }, () => {

                });
            }
        });
    };


    eventList = [Events.feed_view_count_add, Events.feed_comment_count_add, Events.feed_comment_count_minus, Events.feed_like, Events.feed_cancel_like];

    listDataChangeCallback(type, e) {
        let Items = cloneByJson(this.state.Items);
        if (!Items) {
            return;
        }
        let index = Items.findIndex((i) => {
            return e.id === i.id
        });
        if(index<0) return;
        let newItem = Items[index]
        switch (type) {
            case  Events.feed_view_count_add:
                newItem.feed_stats.view_count++;
                break;
            case  Events.feed_comment_count_add:
                newItem.feed_stats.comment_count++;
                break;
            case  Events.feed_comment_count_minus:
                newItem.feed_stats.comment_count--;
                break;
            case  Events.feed_like:
                newItem.feed_stats.like_count++;
                newItem.req_user_stats.like = true;
                break;
            case  Events.feed_cancel_like:
                newItem.feed_stats.like_count--;
                newItem.req_user_stats.like = false;
                break;
        }
        Items.splice(index,1,newItem)
        this.setState({
            Items: Items
        })

    }


    ////////////////////////////////////////////////////////////////////////////// 列表部分逻辑 end
    componentDidMount() {
        this.getList(10, null, false, false);
        try {
            this.eventList.forEach((item) => {
                this[item] = DeviceEventEmitter.addListener(item, this.listDataChangeCallback.bind(this, item));
            })
        } catch (e) {
            console.log('componentDidMount add event error:', e);
        }
    }

    componentWillUnmount() {
        try {
            this.eventList.forEach((item) => {
                this[item].remove()
            })
        } catch (e) {
            console.log('componentWillUnmount remove event error:', e);
        }

    }

    goBack = () => {
        closeRNPage();
    };


    render() {

        const {Items} = this.state;

        const userInfo = this.props.userInfo;

        return (
            <AnimatedHeader
                style={{
                    flex: 1,
                    marginTop: -40
                }}
                renderBack={() => {
                    return  <Button style={{
                        paddingLeft: 16,
                        paddingRight: 10,
                        paddingTop: 8
                    }}
                    transparent
                    onPress={this.goBack}>
                        <Image style={{
                            width: 12,
                            height: 23,

                        }} source={require('@images/icon_back_white.png')}/>
                    </Button>
                }}

                renderLeft={() => {
                    return (<View style={{
                        marginTop: 8
                    }}>
                        <UserAvatar
                            info={userInfo}
                        />
                    </View>)
                }}

                title={() => (
                    <View style={[styles.userInfo, styles.userInfo_other]}>
                        <UserAvatar style={styles.userAvatar} info={userInfo} big/>
                    </View>
                )}
                noBorder={true}
                disabled={false}
            >
                {
                    Items ?
                        <RefreshListView
                            data={Items}
                            ListHeaderComponent={<View style={{
                                backgroundColor: '#F5F5F5',
                                height: 10
                            }}/>}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderItem}
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.handleRefresh}
                            onFooterRefresh={this.handleLoadMore}
                            ItemSeparatorComponent={() => <View
                                style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                            // 可选
                            footerRefreshingText={i18n.t('disclose.footerRefreshingText')}
                            footerFailureText={i18n.t('disclose.footerFailureText')}
                            footerNoMoreDataText={i18n.t('disclose.footerNoMoreDataText')}
                            footerEmptyDataText={i18n.t('disclose.footerEmptyDataText')}
                        /> : <ScrollView><Spinner color={'#888888'} size={'small'}/></ScrollView>
                }

            </AnimatedHeader>
        );
    }
}

export default ViewControl;
