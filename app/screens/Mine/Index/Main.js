import React, {Component} from 'react';

import {
    View,
    RefreshControl,
    StyleSheet,
    FlatList,
    StatusBar,
    Image,
    PixelRatio,
    DeviceEventEmitter, ScrollView
} from 'react-native';

import {
    Container, Header, Content, Text, Button, Left, Right, Body, Title, Spinner, Icon
} from "native-base";

import Modal from "react-native-modal";
import {$toast, uniqueById} from 'app/utils';
import * as navigationActions from 'app/actions/navigationActions';
import DiscloseListItem from 'app/components/DiscloseListItem';

import PropTypes from 'prop-types';
import UserAvatar from './Components/UserAvatar';
import i18n from 'app/i18n';
import avatars from 'app/services/constants'
import RefreshListView, {RefreshState} from 'app/components/RefreshListView';
// import AnimatedHeader from "./Main";
import AnimatedHeader from 'app/components/Collapsible';

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
        // height: 104,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    userAvatar: {
        top: -40,
        marginLeft: 30
    },
    editBtn: {
        marginRight: 16,
        marginTop: 10,
        fontSize: 14
    }
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
            LastEvaluatedKey: null
        }
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired
        // setUserInfo: PropTypes.func.isRequired,
    };
    goEdit = () => {
        this.props.navigation.navigate('MineEidt')
    };
    goSettings = () => {
        this.props.navigation.navigate('MineSettings')
    };

    ////////////////////////////////////////////////////////////////////////////// 列表部分逻辑 start
    // 进入具体详情页面
    pressItem = (item) => {
        // navigationActions.navigateToDiscloseDetail({
        //     id: item._id,
        //     updateData: this.updateData
        // });
        this.props.navigation.navigate('DiscloseDetail', {
            id: item._id,
            updateData: this.updateData
        })
    };

    // 跳往详情页面时，再返回来时更新list页面的state
    updateData = (data) => {
        console.log(data);
    };

    // 点击用户头像跳到该用户的个人中心
    // clickAvatar = (item) => {
    //     navigationActions.navigateToMine({
    //         id: item.userId
    //     });
    // };

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
        this.setState({
            Items: [...this.state.Items]
        });
        // 更新爆料条目中的数据
        this.props.like({
            id: item._id,
            field: 'likeNum',
            cancel: actionValue,
            callback: () => {
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

    // 显示删除弹框
    showDeleteDialog = (item) => {
        this.setState({
            isModalVisible: true,
            activeItem: item
        });
    };

    // 确定删除
    confirmDelete = (item) => {
        this.props.deleteDisclose({
            id: item._id,
            callback: (data) => {
                $toast('删除爆料成功');
                let index = this.state.Items.indexOf(item);
                this.state.Items.splice(index, 1);
                this.setState({
                    isModalVisible: false,
                    activeItem: null
                });
            }
        });
    };

    // 取消删除
    cancelDelete = () => {
        this.setState({
            isModalVisible: false,
            activeItem: null
        })
    };

    // 渲染列表
    renderListItem = ({item, index}) => {
        const {hasData, Items} = this.state;
        return <DiscloseListItem showDeleteDialog={this.showDeleteDialog}
            // clickAvatar={this.clickAvatar}
                                 like={this.like}
                                 opt={{item, index, hasData, Items, userId: this.props.user.id}}
                                 pressItem={this.pressItem}/>
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
        this.getList(this.state.Items.length, null, true, false);
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

        const {navigation} = this.props;
        const id = navigation.getParam('id');
        this.props.getList({
            params: {
                limit: limit || 10,
                LastEvaluatedKey: LastEvaluatedKey || null,
                userId: id || this.props.user.id
            },
            callback: (data) => {
                let {Items, LastEvaluatedKey} = data;
                Items.forEach((item) => {
                    item.source = avatars[(item.avatarType || 0) % 5];
                    item.userName = item.userName || 'Anonymity';
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
        this.subscription = DeviceEventEmitter.addListener('updateDiscloseListData', this.updateState);
        StatusBar.setBarStyle('light-content', true);
    }

    componentWillUnmount() {
        this.subscription.remove();
    };


    render() {
        const {userInfo} = this.props;
        const {refreshing, loadMoreing, Items} = this.state;

        return (
            <AnimatedHeader
                style={{flex: 1}}
                // backText='Back'
                toolbarColor={'#408EF5'}
                renderLeft={() => (<UserAvatar
                    info={{avatar: userInfo.attributes.picture, nickname: userInfo.attributes.nickname}}/>)}
                title={() => (
                    <View style={styles.userInfo}>
                        <UserAvatar style={styles.userAvatar} info={{
                            avatar: userInfo.attributes.picture,
                            nickname: userInfo.attributes.nickname
                        }} big/>
                        <Button transparent onPress={this.goEdit}>
                            <Text>编辑信息</Text>
                        </Button>
                    </View>
                )}
                renderRight={() => (<Button style={{
                    marginRight: 16,
                    marginTop: 16,

                }} transparent onPress={this.goSettings}>
                    <Image source={require('app/images/icon_settings.png')}/>
                </Button>)}
                // backStyle={{marginLeft: 10}}
                // backTextStyle={{fontSize: 14, color: '#fff'}}
                titleStyle={{fontSize: 22, left: 20, bottom: 20, color: '#fff'}}
                headerMaxHeight={200}
                noBorder={true}
                // imageSource={Bg}
                disabled={false}
            >
                {Items ? <RefreshListView
                    data={Items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderListItem}
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


        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <UserAvatar
                            info={{avatar: userInfo.attributes.picture, nickname: userInfo.attributes.nickname}}/>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.goSettings}>
                            <Image source={require('app/images/icon_settings.png')}/>
                        </Button>
                    </Right>

                </Header>

                <Content style={styles.content}>

                    <View style={styles.userBox}>
                        <View style={styles.bg}></View>
                        <View style={styles.userInfo}>
                            <UserAvatar style={styles.userAvatar} info={{
                                avatar: userInfo.attributes.picture,
                                nickname: userInfo.attributes.nickname
                            }} big/>
                            <Button transparent onPress={this.goEdit}>
                                <Text>编辑信息</Text>
                            </Button>
                        </View>
                    </View>

                    <View>
                        {/******************* 我的爆料列表 ********************/}
                        {Items ? <RefreshListView
                            data={Items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderListItem}
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.handleRefresh}
                            onFooterRefresh={this.handleLoadMore}
                            // 可选
                            footerRefreshingText='玩命加载中....'
                            footerFailureText='我擦嘞，居然失败了 =.=!'
                            footerNoMoreDataText='-我是有底线的-'
                            footerEmptyDataText='-好像什么东西都没有-'
                        /> : <View><Spinner size={'small'} color={'#408EF5'}/></View>}
                        {/*需要删除爆料时，弹框提示确定modal*/}
                        <View>
                            <Modal isVisible={this.state.isModalVisible}>
                                <View>
                                    <Button style={styles.modal_btn} block transparent light
                                            onPress={this.confirmDelete.bind(this, this.state.activeItem)}>
                                        <Text style={styles.modal_btn_del_text}>删除</Text>
                                    </Button>
                                    <Button style={styles.modal_btn} block transparent light
                                            onPress={this.cancelDelete}>
                                        <Text style={styles.modal_btn_calcel_text}>取消</Text>
                                    </Button>
                                </View>
                            </Modal>
                        </View>

                    </View>

                </Content>


            </Container>

        );
    }
}


export default ViewControl;
