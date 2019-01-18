import React, {Component} from 'react';
import DoubleClicker from 'app/components/DoubleClicker';
import styles from './styles';
import {Container, Header, Content, Text, Button, Left, Right, Body, Title, Spinner} from "native-base";
import {View, RefreshControl, FlatList, Image, PixelRatio} from 'react-native';

import Modal from "react-native-modal";
import {$toast, uniqueById} from 'app/utils';

import * as navigationActions from 'app/actions/navigationActions';
import DiscloseListItem from 'app/components/DiscloseListItem';

import i18n from 'app/i18n';
import avatars from 'app/services/constants'

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
            initLoading: true
        }
    }

    // 双击导航标题,回到顶部
    titleDoubleClick = () => {
        this._flatList.scrollToIndex({index: 0, viewPosition: 0})
    };

    // 写爆料
    writeDisclose = () => {
        navigationActions.navigateToDisclosePublish();
    };

    // 进入具体详情页面
    pressItem = (item) => {
        navigationActions.navigateToDiscloseDetail({
            id: item._id
        });
    };

    // 点击用户头像跳到该用户的个人中心
    clickAvatar = (item) => {
        navigationActions.navigateToMine({
            id: item.userId
        });
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
                // 删除成功
                if (data.success) {
                    // todo 国际化
                    $toast('删除爆料成功');
                    let index = this.state.Items.indexOf(item);
                    this.state.Items.splice(index, 1);
                    this.setState({
                        isModalVisible: false,
                        activeItem: null
                    });
                }
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
        if (this.state.refreshing) {
            return false;
        }
        this.setState({
            refreshing: true
        });
        this.getList(this.state.Items.length, null, true, false);
    };

    // 上拉加载更多
    handleLoadMore = () => {
        if (this.state.loadMoreing) {
            return false;
        }
        this.setState({
            loadMoreing: true
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
                if (data.success) {
                    let {Items, LastEvaluatedKey} = data.data;
                    Items.forEach((item) => {
                        item.source = avatars[(item.avatarType || 0) % 5];
                        item.userName = item.userName || 'Anonymity';
                    });
                    let scrollIndex = (this.state.Items || []).length;
                    let list = [];
                    // 向下拉时，更新最新前面的数据
                    if (refresh) {
                        list = uniqueById([...Items, this.state.Items]);
                    }
                    // 加载更多
                    else if (loadmore) {
                        list = uniqueById([this.state.Items, ...Items]);
                    } else {
                        list = Items;
                    }
                    this.setState({
                        Items: list,
                        LastEvaluatedKey: LastEvaluatedKey,
                        loadMoreing: false,
                        refreshing: false,
                    }, () => {
                        // if (loadMoreing && scrollIndex > 4) {
                        //     this._flatList.scrollToIndex({viewPosition: 0, index: scrollIndex - 4});
                        // }
                    });
                    // if (!LastEvaluatedKey && loadmore) {
                    //     $toast(i18n.t('disclose.list_nomore_tip'));
                    // }
                }
            }
        });
    };

    componentDidMount() {
        this.getList(10, null, false, false);
    }

    render() {
        const {refreshing, loadMoreing, Items} = this.state;
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <DoubleClicker onClick={this.titleDoubleClick}>
                        <Title style={styles.title}>{i18n.t('disclose.title')}</Title>
                    </DoubleClicker>
                    </Body>
                    <Right>
                        <Button transparent light onPress={this.writeDisclose}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('app/images/btn_post.png')}/>
                        </Button>
                    </Right>
                </Header>
                {
                    Items ? <FlatList
                        ref={(flatlist) => this._flatList = flatlist}
                        initialNumToRender={4}
                        keyExtractor={(item, index) => item + index}
                        ListEmptyComponent={<Text style={styles.nodata}>{i18n.t('disclose.no_data_tip')}</Text>}
                        ItemSeparatorComponent={() => <View
                            style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                        data={Items}
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh}
                        renderItem={this.renderListItem}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={-0.2}
                        ListFooterComponent={loadMoreing ? <Spinner size={'small'} color={'#408EF5'}/> : null}
                    /> : <Content><Spinner size={'small'} color={'#408EF5'}/></Content>
                }
                {/*需要删除爆料时，弹框提示确定modal*/}
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View>
                            <Button style={styles.modal_btn} block transparent light
                                    onPress={this.confirmDelete.bind(this, this.state.activeItem)}>
                                <Text style={styles.modal_btn_del_text}>删除</Text>
                            </Button>
                            <Button style={styles.modal_btn} block transparent light onPress={this.cancelDelete}>
                                <Text style={styles.modal_btn_calcel_text}>取消</Text>
                            </Button>
                        </View>
                    </Modal>
                </View>
            </Container>
        );
    }
}

export default Screen;
