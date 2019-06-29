import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    PixelRatio
} from 'react-native';

import {
    Button, Spinner
} from "@components/NDLayout";

import DiscloseListItem from './components/DiscloseListItem';
import PropTypes from 'prop-types';
import UserAvatar from '@components/UserAvatar';
import i18n from '@i18n';
import RefreshListView, {RefreshState} from '@components/RefreshListView';
import AnimatedHeader from '@components/Collapsible';
import {closeRNPage, goRNPage} from "@utils/CNNBridge";
import * as Events from "@src/data/ListChangeEvent";
import {cloneByJson, ActionSheet, cnnLogger} from "@src/utils";


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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // paddingBottom: 20
        marginLeft: 10
    },
    userInfo_other: {
        justifyContent: 'center',
    },
    userAvatar: {
        top: -40,
        marginLeft: 30,
        // marginBottom: 10
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
            Count: 0,
            isModalVisible: false,
            activeItem: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            userId: '',
            initLoading: true,
            Mine_Items: null
        };
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    goEdit = () => {
        goRNPage({
            moduleName: 'stark_mine_edit',
            // params:{
            //     initialRoute: 'Edit'
            // }
        })
    };

    goSettings = () => {
        goRNPage({
            moduleName: 'stark_mine_setting',
            // params:{
            //     initialRoute: 'Setting'
            // }
        })
    };

    ////////////////////////////////////////////////////////////////////////////// 列表部分逻辑 start
    // 进入具体详情页面
    pressItem = (item) => {

        cnnLogger('enter_detail', {
            from: 'me_diclose',
            type: 'disclose',
            feed_id: item.id,
            user_id: item.user.id,
        });

        goRNPage({
            moduleName: 'stark_disclose_detail',
            params: {
                id: item.id,
                data: item
            }
        });
    };

    // 点赞
    like = (item) => {

        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
                params:{
                    event:{
                        from: 'myHome',
                        trigger: 'like',
                    }
                }
            });
            return;
        }

        // 先在界面上更改点赞行为
        // let like_count = item.disclose_stats.like_count;
        let actionValue = item.req_user_stats.like;
        // item.req_user_stats.like = !actionValue;
        // item.disclose_stats.like_count = !actionValue ? Number(like_count) + 1 : Number(like_count) - 1;
        //
        //
        // this.setState({
        //     Mine_Items:[...this.state.Mine_Items]
        // });

        if (!actionValue) {


            cnnLogger('like_feed', {
                from: 'me_diclose',
                type: 'disclose',
                feed_id: item.id,
                user_id: item.user.id,

            });

            this.props.like({
                params: item,
                id: item.id
            })
        } else {

            cnnLogger('cancel_like_feed', {
                from: 'me_diclose',
                type: 'disclose',
                feed_id: item.id,
                user_id: item.user.id,

            });


            this.props.cancel_like({
                params: item,
                id: item.id
            })
        }


    };

    // 显示删除弹框
    showDeleteDialog = (item, index) => {


        if (!this.props.user.isLogin) {
            goRNPage({
                moduleName: 'stark_login',
                params:{
                    event:{
                        from: 'myHome',
                        trigger: 'delete',
                    }
                }
            });
            return;
        }

        ActionSheet(
            {
                options: [i18n.t('cancel'), i18n.t('delete')],
                cancelButtonIndex: 0,
                destructiveButtonIndex: 1,
                colors: ['#007AFF', '#FF3B30'],
            },
            buttonIndex => {
                if (buttonIndex === 1) {

                    this.state.Mine_Items.splice(index, 1);

                    this.props.deleteDisclose({
                        id: item.id,
                        callback: () => {
                            this.setState({
                                isModalVisible: false,
                                activeItem: null,
                            });
                        }
                    });
                }
            }
        );
    };


    // 渲染列表
    renderListItem = ({item, index}) => {
        return <DiscloseListItem showDeleteDialog={this.showDeleteDialog.bind(this, item, index)}
                                 isMyHome={true}
                                 like={this.like}
                                 key={index + ''}
                                 opt={{item, index}}
                                 pressItem={this.pressItem}/>
    };

    //  下滑刷新
    handleRefresh = () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        this.getList(10, null, true);
    };

    // 上拉加载更多
    handleLoadMore = () => {
        this.setState({
            refreshState: RefreshState.FooterRefreshing
        });
        this.getList(10, this.state.LastEvaluatedKey, false);
    };

    /**
     * 获取爆料列表数据和获取每条爆料条目对应用户的行为数据
     * @param limit 返回限制
     * @param LastEvaluatedKey 标识下一次请求从哪个条目开始
     * @param refresh      向下拉刷新
     * @param loadmore     加载更多
     * */
    getList = (limit, LastEvaluatedKey, refresh) => {

        if (refresh) {
            cnnLogger('refresh_request', {
                pos: 'me_diclose',
                action: 'prev'
            });
        } else {
            cnnLogger('refresh_request', {
                pos: 'me_diclose',
                action: 'next'
            });
        }

        this.props.getList({
            params: {
                count: limit || 10,
                read_tag: LastEvaluatedKey || null,
                user_id: this.props.user.id
                // user_id: '18418120'
            },
            onSuccess: (data) => {
                if (refresh) {
                    cnnLogger('refresh_response', {
                        pos: 'me_diclose',
                        action: 'prev',
                        count: 10
                    });
                    this.setState({
                        Mine_Items: [...data.list],
                        LastEvaluatedKey: data.read_tag,
                        refreshState: !data.hasMore ? RefreshState.NoMoreData : RefreshState.Idle
                    });
                } else {
                    cnnLogger('refresh_response', {
                        pos: 'me_diclose',
                        action: 'next',
                        count: 10
                    });
                    this.setState({
                        Mine_Items: [...(this.state.Mine_Items || []), ...data.list],
                        LastEvaluatedKey: data.read_tag,
                        refreshState: !data.hasMore ? RefreshState.NoMoreData : RefreshState.Idle
                    });
                }
            },
            onFail: (e) => {
                this.setState({
                    refreshState: RefreshState.Failure,
                });
            }
        });
    };

    eventList = [
        Events.disclose_view_count_add,
        Events.disclose_add,
        Events.disclose_delete,
        Events.disclose_comment_count_add,
        Events.disclose_like,
        Events.disclose_cancel_like,
        Events.disclose_comment_count_minus
    ];

    listDataChangeCallback(type, e) {

        try {


            let Items = cloneByJson(this.state.Mine_Items);

            if (!Items) {
                return;
            }

            const item = Items.find((i) => {
                return e.id === i.id
            });

            let index = -1;
            const params = e.params || {};

            switch (type) {
                case  Events.disclose_view_count_add:

                    item && item.disclose_stats.view_count++;
                    break;

                case  Events.disclose_add:
                    if (params.id) {
                        Items.splice(0, 0, params);
                    }
                    break;
                case  Events.disclose_delete:

                    index = Items.findIndex((i) => {
                        return e.id === i.id
                    });
                    if (index > -1) {
                        if (params.id) {
                            Items.splice(index, 1);
                        }
                    }

                    break;

                case  Events.disclose_comment_count_add:
                    item && item.disclose_stats.comment_count++;
                    break;

                case  Events.disclose_like:
                    if (item) {
                        item.disclose_stats.like_count++;
                        item.req_user_stats.like = true;
                    }

                    break;
                case  Events.disclose_cancel_like:
                    if (item) {
                        item.disclose_stats.like_count--;
                        item.req_user_stats.like = false;
                    }
                    break;
                case  Events.disclose_comment_count_minus:
                    item && item.disclose_stats.comment_count--;
                    break;
            }


            this.setState({
                Mine_Items: [...Items]
            })
        } catch (e) {
            console.log(e);
        }


    }

    componentDidMount() {
        this.getList(10, null, false);

        // this.userStateListener = DeviceEventEmitter.addListener('userStateChange',(data)=>{
        //     debugger;
        // });

        try {

            this.eventList.forEach((item) => {
                this[item] = DeviceEventEmitter.addListener(item, this.listDataChangeCallback.bind(this, item));
            })


        } catch (e) {
            console.log('componentDidMount add event error:', e);
        }
    }

    componentWillUnmount() {

        // this.userStateListener.remove();

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

        const {user} = this.props;

        const {Mine_Items} = this.state;


        return (
            <AnimatedHeader
                style={{
                    flex: 1,
                    marginTop: -30
                }}
                toolbarColor={'#408EF5'}
                renderBack={() => {
                    return <Button transparent style={{
                        paddingLeft: 16,
                        paddingRight: 10
                    }} onPress={this.goBack.bind(this)}>
                        <Image style={{
                            width: 12,
                            height: 23,
                            marginRight: 8,
                        }} source={require('@images/icon_back_white.png')}/>
                    </Button>
                }}

                renderLeft={() => {
                    return (<UserAvatar
                        info={{avatar: user.avatar || user.picture, nickname: user.name}}
                    />)
                }}

                title={() => (
                    <View style={[styles.userInfo]}>
                        <UserAvatar style={styles.userAvatar} info={{
                            avatar: user.avatar || user.picture,
                            nickname: user.name
                        }} big/>
                        <TouchableOpacity onPress={this.goEdit}>
                            <Text style={{
                                marginRight: 16,
                                color: '#408EF5',
                                marginTop: 8,
                                fontSize: 14,
                                lineHeight: 20
                            }}>{i18n.t('edit_info')}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderRight={
                    () => (null)
                }
                noBorder={true}
                disabled={false}
            >
                {
                    Mine_Items ? <RefreshListView
                        data={Mine_Items}
                        ListHeaderComponent={<View style={{
                            backgroundColor: '#F5F5F5',
                            height: 10
                        }}/>}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderListItem}
                        refreshState={this.state.refreshState}
                        onHeaderRefresh={this.handleRefresh}
                        onFooterRefresh={this.handleLoadMore}
                        ItemSeparatorComponent={() => <View
                            style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                        // 可选
                        footerRefreshingText={i18n.t('disclose.footerRefreshingText')}
                        footerFailureText={i18n.t('disclose.footerFailureText')}
                        refreshControlPrepareText={i18n.t('disclose.refreshControlPrepareText')}
                        refreshControlNormalText={i18n.t('disclose.refreshControlNormalText')}
                        footerNoMoreDataText={i18n.t('disclose.footerNoMoreDataText')}
                        footerEmptyDataText={i18n.t('disclose.footerEmptyDataText')}
                    /> : <ScrollView><Spinner/></ScrollView>
                }

            </AnimatedHeader>
        );
    }
}


export default ViewControl;
