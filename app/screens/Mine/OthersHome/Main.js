import React, {Component} from 'react';

import {
    View,
    RefreshControl,
    StyleSheet,
    FlatList,
    StatusBar,
    Image,
    PixelRatio,
    DeviceEventEmitter, ScrollView, Dimensions
} from 'react-native';

import {
    Text, Button, Spinner
} from "native-base";

import Modal from "react-native-modal";
import {$toast, uniqueById} from 'app/utils';

import PropTypes from 'prop-types';
import UserAvatar from './Components/UserAvatar';
import i18n from 'app/i18n';
import avatars from 'app/services/constants'
import RefreshListView, {RefreshState} from 'app/components/RefreshListView';
// import AnimatedHeader from "./Main";
import AnimatedHeader from 'app/components/Collapsible';

import Item from "./Components/Item";

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
            activeItem: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            userId: '',
        };
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };


    ////////////////////////////////////////////////////////////////////////////// 列表部分逻辑 start
    // 进入具体详情页面
    pressItem = (item) => {
        // navigationActions.navigateToDiscloseDetail({
        //     id: item._id,
        //     updateData: this.updateData
        // });
        this.props.navigation.navigate('NewsDetail', {
            id: item._id,
            updateData: this.updateData
        })
    };

    // 跳往详情页面时，再返回来时更新list页面的state
    updateData = (data) => {
        console.log(data);
    };

    // 点赞
    like = (item) => {
        if (!this.props.user.id) {
            this.props.navigation.navigate('Login', {
                prevState: this.props.navigation.state
            });
            return;
        }
        // 先在界面上更改点赞行为
        let actionValue = item.userAction.actionValue;
        item.userAction.actionValue = !actionValue;
        item.likeNum = !actionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
        this.setState({
            Items: [...this.state.Items]
        });
        // 更新用户对该资源的行为数据
        this.props.updateAction({
            _id: item.userAction._id,
            obj: {
                objectId: item._id,
                userId: this.props.user.id,
                actionType: 1,
                objectType: 1,
                actionValue: !actionValue
            },
            callback: (res) => {
            }
        });
    };


    // // 渲染列表
    // renderListItem = ({item, index}) => {
    //     const {hasData, Items} = this.state;
    //     return <DiscloseListItem showDeleteDialog={this.showDeleteDialog}
    //         // clickAvatar={this.clickAvatar}
    //                              like={this.like}
    //                              opt={{item, index, hasData, Items, userId: this.props.user.id}}
    //                              pressItem={this.pressItem}/>
    // };

    goUserDetail = (info) => {
        this.props.navigation.navigate('OthersHome', {userInfo: info.user})
    };

    goDetail = (info) => {
        const {_id, category} = info;
        this.props.navigation.navigate('NewsDetail', {_id, category})
    };


    renderItem = ({item, index, separators, cat}) => {
        return <Item info={item}
                     key={item._id}
                     onLike={this.like.bind(item)}
                     onAvatarClick={this.goUserDetail.bind(this,item)}
                     onItemClick={this.goDetail}/>
    };

    //  下滑刷新
    handleRefresh = () => {
        // if (this.state.refreshing) {
        //     return false;
        // }
        this.setState({
            // refreshing: true,
            refreshState: RefreshState.HeaderRefreshing
        });
        // let userId = this.props.navigation.getParam('id') || this.props.user.id;
        this.getList(this.state.userId, this.state.Items.length, null, true, false);
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
                limit: limit || 10,
                LastEvaluatedKey: LastEvaluatedKey || null,
                userId: this.props.navigation.getParam('userInfo').sub
            },
            callback: (data) => {
                let {Items, LastEvaluatedKey} = data;
                Items.forEach((item) => {
                    // item.source = avatars[(item.avatarType || 0) % 5];
                    // item.userName = item.userName || 'Anonymity';
                });
                let list = [];
                // 向下拉时，更新最新前面的数据
                if (refresh) {
                    list = uniqueById([...Items, ...this.state.Items]);
                }
                // 加载更多
                else if (loadmore) {
                    list = uniqueById([...this.state.Items, ...Items]);
                } else {
                    list = Items;
                }
                this.setState({
                    Items: list,
                    refreshState: list.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
                    LastEvaluatedKey: LastEvaluatedKey,
                    loadMoreing: false,
                    refreshing: false,
                    initLoading: false
                }, () => {

                });
            }
        });
    };

    /**
     * 监听更新列表的回调函数
     * @param type 操作类型
     * @param data 更新数据
     * */
    updateState = (type, data) => {
        if (!data._id) {
            return;
        }
        let Items = this.state.Items;
        let index = Items.findIndex((item) => {
            return item._id === data._id
        });
        switch (type) {
            case 'update':
                Items[index] = data;
                break;
            case 'delete':
                Items.splice(index, 1);
                break;
            case 'unshift':
                Items.unshift(data);
                break;
            default:
                break;
        }
        this.setState({
            Items: [...Items]
        });
    };

    ////////////////////////////////////////////////////////////////////////////// 列表部分逻辑 end
    componentDidMount() {
        this.getList(10, null, false, false);
        this.subscription = DeviceEventEmitter.addListener('updateFeedListData', this.updateState);
    }


    componentWillUnmount() {
        // debugger;
        this.subscription.remove();
    };

    goBack = () => {
        this.props.navigation.goBack();
        // this.setState({
        //     userId: this.props.user.id,
        //     Items: null
        // });
        // this.getList(this.state.userId, 10, null, false, false);
        // this.subscription = DeviceEventEmitter.addListener('updateDiscloseListData', this.updateState);
    };


    render() {
        const {navigation, user} = this.props;
        const {refreshing, loadMoreing, Items} = this.state;
        const userInfo = navigation.getParam('userInfo');
        return (
            <AnimatedHeader
                style={{flex: 1}}
                // backText='Back'
                toolbarColor={'#408EF5'}
                renderBack={() => {
                    return <Button transparent onPress={this.goBack.bind(this)}>
                        <Image style={{
                            width: 18,
                            height: 18,
                            marginRight: 5,
                        }} source={require('app/images/icon_back_white.png')}/>

                    </Button>
                }}
                title={() => (
                    <View style={[styles.userInfo, styles.userInfo_other]}>
                        <UserAvatar style={styles.userAvatar} info={{
                            avatar: userInfo.picture,
                            nickname: userInfo.nickname
                        }} big/>
                    </View>
                )}
                noBorder={true}
                disabled={false}
            >
                {Items ? <RefreshListView
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
                    // 可选
                    footerRefreshingText='玩命加载中....'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='-我是有底线的-'
                    footerEmptyDataText='-好像什么东西都没有-'
                /> : <ScrollView><Spinner size={'small'} color={'#408EF5'}/></ScrollView>}
            </AnimatedHeader>
        );
    }
}


export default ViewControl;