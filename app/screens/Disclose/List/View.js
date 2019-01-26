import React, {Component} from 'react';
import DoubleClicker from 'app/components/DoubleClicker';
import styles from './styles';
import {Container, Header, Content, Text, Button, Left, Right, Body, Title, Spinner} from "native-base";
import {View, Image, DeviceEventEmitter} from 'react-native';

import Modal from "react-native-modal";
import {$toast, uniqueById} from 'app/utils';

import * as navigationActions from 'app/actions/navigationActions';
import DiscloseListItem from 'app/components/DiscloseListItem';

import i18n from 'app/i18n';
import avatars from 'app/services/constants'
import RefreshListView, {RefreshState} from 'app/components/RefreshListView';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
    // maximum capacity, default 1000
    size: 100,
    storageBackend: AsyncStorage, // for web: window.localStorage
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
    // cache data in the memory. default is true.
    enableCache: true,

});

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loadMoreing: false,
            hasData: true,
            Items: null,
            isModalVisible: false,
            activeItem: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            initLoading: true,
            refreshState: RefreshState.Idle,
        }
    }

    // 双击导航标题,回到顶部
    // titleDoubleClick = () => {
    //     this._flatList.scrollToIndex({index: 0, viewPosition: 0})
    // };

    // 写爆料
    writeDisclose = () => {
        if (!this.props.user.id) {
            $toast(i18n.t('disclose.needLoginForPublish'));
            return;
        }
        navigationActions.navigateToDisclosePublish();
    };

    // 进入具体详情页面
    pressItem = (item) => {
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
        // this.props.like({
        //     id: item._id,
        //     field: 'likeNum',
        //     cancel: actionValue,
        //     callback: () => {
        //         debugger;
        //     }
        // });
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
                $toast(i18n.t('disclose.deleteOk'));
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
    renderListItem = ({item, index, separators}) => {
        const {hasData, Items} = this.state;
        return <DiscloseListItem showDeleteDialog={this.showDeleteDialog}
                                 separators={separators}
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
                limit: limit || 10,
                LastEvaluatedKey: LastEvaluatedKey || null,
                userId: this.props.user.id
            },
            callback: (data) => {
                let {Items, LastEvaluatedKey} = data;
                Items.forEach((item) => {
                    item.source = avatars[(item.avatarType || 0) % 5];
                    item.userName = item.userName || 'Anonymity';
                });
                let scrollIndex = (this.state.Items || []).length;
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

    componentDidMount() {
        storage.save({
            key: 'firstEntryDisclose',
            data: true,
            expires: null
        });
        this.getList(10, null, false, false);
        this.subscription = DeviceEventEmitter.addListener('updateDiscloseListData', this.updateState);
    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    render() {
        const {refreshing, loadMoreing, Items} = this.state;
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title style={styles.title}>{i18n.t('disclose.title')}</Title>
                    </Body>
                    <Right>
                        <Button transparent light onPress={this.writeDisclose}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('app/images/btn_post.png')}/>
                        </Button>
                    </Right>
                </Header>

                {Items ? <RefreshListView
                    data={Items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderListItem}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.handleRefresh}
                    onFooterRefresh={this.handleLoadMore}

                    // 可选
                    footerRefreshingText={i18n.t('disclose.footerRefreshingText')}
                    footerFailureText={i18n.t('disclose.footerFailureText')}
                    footerNoMoreDataText={i18n.t('disclose.footerNoMoreDataText')}
                    footerEmptyDataText={i18n.t('disclose.footerEmptyDataText')}

                /> : <Content><Spinner size={'small'} color={'#408EF5'}/></Content>

                }
                {/*需要删除爆料时，弹框提示确定modal*/}
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View>
                            <Button style={styles.modal_btn} block transparent light
                                    onPress={this.confirmDelete.bind(this, this.state.activeItem)}>
                                <Text style={styles.modal_btn_del_text}>{i18n.t('disclose.delete')}</Text>
                            </Button>
                            <Button style={styles.modal_btn} block transparent light onPress={this.cancelDelete}>
                                <Text style={styles.modal_btn_calcel_text}>{i18n.t('disclose.cancel')}</Text>
                            </Button>
                        </View>
                    </Modal>
                    {/* 首次进入匿名爆料区时，进行评论和发帖弹框 */}
                    <Modal isVisible={this.state.firstEntry}>
                        <View>
                            <Text style={styles.modal_btn_del_text}>{i18n.t('disclose.delete')}</Text>
                        </View>
                    </Modal>
                </View>
            </Container>
        );
    }
}

export default Screen;
