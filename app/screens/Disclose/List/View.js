import React, {Component} from 'react';
import DoubleClicker from 'app/components/DoubleClicker';
import styles from './styles';
import {Container, Header, Content, Text, Button, Left, Right, Body, Title, Spinner, ActionSheet} from "native-base";
import {View, Image, DeviceEventEmitter} from 'react-native';

import {$toast, uniqueById, getSeconds, getNumByUserId} from 'app/utils';

import * as navigationActions from 'app/actions/navigationActions';
import DiscloseListItem from 'app/components/DiscloseListItem';
import Modal from 'react-native-modal';

import i18n from 'app/i18n';
import avatars from 'app/services/constants'
import RefreshListView, {RefreshState} from 'app/components/RefreshListView/index2';


import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

const __storage__ = new Storage({
    // maximum capacity, default 1000
    size: 100,
    storageBackend: AsyncStorage,
    defaultExpires: null,
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
            firstEntryDisclose: false
        }
    }

    // 双击导航标题,回到顶部
    // titleDoubleClick = () => {
    //     this._flatList.scrollToIndex({index: 0, viewPosition: 0})
    // };

    // 写爆料
    writeDisclose = () => {
        // if (!this.props.user.id) {
        //     $toast(i18n.t('disclose.needLoginForPublish'));
        //     return;
        // }
        if (!this.props.user.id) {
            this.props.navigation.navigate('Login', {
                prevState: this.props.navigation.state
            });
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

        let index = this.state.Items.indexOf(item);

        ActionSheet.show(
            {
                options: [i18n.t('cancel'), i18n.t('delete')],
                cancelButtonIndex: 0,
                destructiveButtonIndex: 1,
                // title: i18n.t('delete_disclose_confirm')
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    this.state.Items.splice(index, 1);
                    this.props.deleteDisclose({
                        id: item._id,
                        callback: (data) => {
                            this.setState({
                                isModalVisible: false,
                                activeItem: null,
                                Items: JSON.parse(JSON.stringify(this.state.Items))
                            });
                        }
                    });
                }
            }
        );
    };
    // 不感兴趣，并删除该条目
    showDisLikeDialog= (item) => {
        let index = this.state.Items.indexOf(item);
        ActionSheet.show(
            {
                options: [i18n.t('cancel'), i18n.t('dislike')],
                cancelButtonIndex: 0,
                destructiveButtonIndex: 1,
                // title: i18n.t('delete_disclose_confirm')
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    this.state.Items.splice(index, 1);
                    // this.props.deleteDisclose({
                    //     id: item._id,
                    //     callback: (data) => {
                    //         this.setState({
                    //             isModalVisible: false,
                    //             activeItem: null,
                    //             Items: JSON.parse(JSON.stringify(this.state.Items))
                    //         });
                    //     }
                    // });
                }
            }
        );
    };

    // 渲染列表
    renderListItem = ({item, index, separators}) => {
        const {hasData, Items} = this.state;
        return <DiscloseListItem showDeleteDialog={this.showDeleteDialog.bind(this, item)}
                                 showDisLikeDialog={this.showDisLikeDialog.bind(this, item)}
                                 separators={separators}
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


        // // debugger;
        // let Items = this.state.Items;
        // let lastItem = Items[Items.length - 1];
        // let LastEvaluatedKey = {
        //     Index: 1,
        //     userId: lastItem.userId,
        //     _id: lastItem._id,
        // };
        // console.log(LastEvaluatedKey);

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
                    let avatarType = getNumByUserId(item.userId);
                    item.source = avatars[avatarType % 5];
                    item.userName = i18n.t('disclose.anonymous');
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
        let avatarType = getNumByUserId(data.userId);
        data.source = avatars[avatarType % 5];
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
                data.userName = i18n.t('disclose.anonymous');
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

    componentDidMount() {

        __storage__
            .load({
                key: 'firstEntry',
            })
            .then(ret => {
                this.setState({
                    firstEntryDisclose: false
                })
            })
            .catch(err => {
                console.warn(err.message);
                this.setState({
                    firstEntryDisclose: true
                }, () => {
                    if (this.state.firstEntryDisclose) {
                        __storage__.save({
                            key: 'firstEntry',
                            data: {
                                disclose: false
                            },
                            expires: null
                        });
                    }
                });
                setTimeout(() => {
                    this.setState({
                        firstEntryDisclose: false
                    })
                }, 3000)
            });


        this.getList(10, null, false, false);
        this.subscription = DeviceEventEmitter.addListener('updateDiscloseListData', this.updateState);


    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    render() {

        const {refreshing, loadMoreing, Items} = this.state;

        let avatarType = getNumByUserId(this.props.user.id || '0');
        let source = avatars[avatarType % 5];

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
                    refreshControlNormalText={i18n.t('disclose.refreshControlNormalText')}
                    refreshControlPrepareText={i18n.t('disclose.refreshControlPrepareText')}
                    refreshControlLoadingText={i18n.t('disclose.refreshControlLoadingText')}

                /> : <Content><Spinner size={'small'} color={'#408EF5'}/></Content>

                }

                {/*/!* 首次进入匿名爆料区时，进行评论和发帖弹框 *!/*/}
                <View style={{
                    justifyContent: "center",
                }}>
                    <Modal
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: 'flex'
                        }}
                        isVisible={this.state.firstEntryDisclose}
                        backdropOpacity={0.3}
                    >
                        <View style={{
                            backgroundColor: "#FCFCFC",
                            paddingTop: 30,
                            paddingBottom: 20,
                            paddingLeft: 20,
                            paddingRight: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 12,
                            // display: 'flex',
                            width: 260,
                        }}>
                            <Text style={{
                                color: '#030303',
                                fontSize: 18,
                                lineHeight: 25,
                                textAlign: 'center'
                            }}>{i18n.t('firstEntryDisclose')}</Text>
                            <Image style={{
                                color: '#030303',
                                width: 50,
                                height: 50,
                                marginTop: 11,
                                marginBottom: 11
                            }} source={source}/>
                            <Text style={{
                                color: '#666666',
                                fontSize: 14,
                                lineHeight: 20
                            }}>{this.props.user.name}</Text>
                        </View>

                    </Modal>
                </View>

            </Container>
        );
    }
}

export default Screen;
