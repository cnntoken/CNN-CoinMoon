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
    Text, Button, Spinner, ActionSheet
} from "native-base";

import Modal from "react-native-modal";
import {$toast, getNumByUserId, uniqueById} from 'app/utils';
// import * as navigationActions from 'app/actions/navigationActions';
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
            Count: 0,
            isModalVisible: false,
            activeItem: null,
            // 用于标识是否还有更多数据
            LastEvaluatedKey: null,
            userId: '',
        };
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
        // 更新爆料条目中的数据
        // this.props.like({
        //     id: item._id,
        //     field: 'likeNum',
        //     cancel: actionValue,
        //     callback: () => {
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

        let index = this.state.Items.indexOf(item);

        ActionSheet.show(
            {
                options: [i18n.t('cancel'), i18n.t('delete')],
                cancelButtonIndex: 0,
                destructiveButtonIndex: 1,
                title: i18n.t('delete_disclose_confirm')
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    this.state.Items.splice(index, 1);
                    this.props.deleteDisclose({
                        id: item._id,
                        callback: (data) => {
                            this.setState({
                                // isModalVisible: false,
                                activeItem: null,
                                Items: JSON.parse(JSON.stringify(this.state.Items))
                            });
                            DeviceEventEmitter.emit('updateDiscloseListData', 'delete', item);
                        }
                    });
                }
            }
        );
    };


    // 渲染列表
    renderListItem = ({item, index}) => {
        const {hasData, Items} = this.state;
        return <DiscloseListItem showDeleteDialog={this.showDeleteDialog}
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
        // let userId = this.props.navigation.getParam('id') || this.props.user.id;
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

        // let Items = this.state.Items;
        // let lastItem = Items[Items.length - 1];
        // let LastEvaluatedKey = {
        //     updatedAt: lastItem.updatedAt,
        //     userId: lastItem.userId,
        //     _id: lastItem._id,
        // };

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
                    let avatarType = getNumByUserId(item.userId || 0);
                    item.source = avatars[avatarType % 5];
                    item.userName = item.userName || i18n.t('disclose.anonymous');
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
                    list = uniqueById(Items);
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
            Items: [...Items],
            refreshState: Items.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
        });
    };


    ////////////////////////////////////////////////////////////////////////////// 列表部分逻辑 end
    componentDidMount() {
        this.getList(10, null, false, false);
        this.subscription = DeviceEventEmitter.addListener('updateDiscloseListData', this.updateState);
        // StatusBar.setBarStyle('light-content', true);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        // let userId = nextProps.navigation.getParam('id') || nextProps.user.id;
        // if (userId) {
        //     this.setState({
        //         userId: userId,
        //         Items: null
        //     })
        // }
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
        const {userInfo, navigation, user} = this.props;
        const {refreshing, loadMoreing, Items} = this.state;
        const isMine = !this.props.navigation.getParam('id') || this.props.navigation.getParam('id') === user.id;
        return (
            <AnimatedHeader
                style={{flex: 1}}
                // backText='Back'
                toolbarColor={'#408EF5'}
                renderBack={() => {
                    if (isMine) {
                        return null;
                    }
                    return <Button transparent onPress={this.goBack.bind(this)}>
                        <Image style={{
                            width: 18,
                            height: 18,
                            marginRight: 5,
                        }} source={require('app/images/icon_back_white.png')}/>
                    </Button>
                }}
                renderLeft={() => {
                    return (<UserAvatar
                        info={{avatar: user.picture, nickname: user.nickname}}
                    />)
                }}
                title={() => (
                    <View style={[styles.userInfo, !isMine && styles.userInfo_other]}>
                        <UserAvatar style={styles.userAvatar} info={{
                            avatar: userInfo.attributes.picture,
                            nickname: userInfo.attributes.nickname
                        }} big/>
                        {isMine ? <Button transparent onPress={this.goEdit}>
                            <Text>{i18n.t('edit_info')}</Text>
                        </Button> : null}
                    </View>
                )}

                // renderOthers={() => {
                //     return <View>
                //         <Modal isVisible={this.state.isModalVisible}>
                //             <View>
                //                 <Button style={styles.modal_btn} block transparent light
                //                         onPress={this.confirmDelete.bind(this, this.state.activeItem)}>
                //                     <Text style={styles.modal_btn_del_text}>删除</Text>
                //                 </Button>
                //                 <Button style={styles.modal_btn} block transparent light
                //                         onPress={this.cancelDelete}>
                //                     <Text style={styles.modal_btn_calcel_text}>取消</Text>
                //                 </Button>
                //             </View>
                //         </Modal>
                //     </View>
                // }}


                renderRight={() => (<Button style={{
                    marginRight: 16,
                    marginTop: 26,

                }} transparent onPress={this.goSettings}>
                    <Image source={require('app/images/icon_settings.png')}/>
                </Button>)}
                // backStyle={{marginLeft: 10}}
                // backTextStyle={{fontSize: 14, color: '#fff'}}
                // titleStyle={{fontSize: 22, left: 20, bottom: 20, color: '#fff'}}
                noBorder={true}
                // imageSource={Bg}
                disabled={false}
            >
                {Items ? <RefreshListView
                    data={Items}
                    ListHeaderComponent={<View style={{
                        backgroundColor: '#F5F5F5',
                        height: 10
                    }}/>}
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
                /> : <ScrollView><Spinner size={'small'} color={'#408EF5'}/></ScrollView>}
            </AnimatedHeader>
        );
    }
}


export default ViewControl;
