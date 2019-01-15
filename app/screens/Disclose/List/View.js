import React, {Component} from 'react';
import DoubleClicker from 'app/components/DoubleClicker';
import styles from './styles';
import {Container, Header, Content, Text, Button, Left, Right, Body, Title, Spinner} from "native-base";
import {View, RefreshControl, FlatList, Image, PixelRatio} from 'react-native';

import Modal from "react-native-modal";
import {$toast} from 'app/utils';

import * as navigationActions from 'app/actions/navigationActions';
import DiscloseListItem from 'app/components/DiscloseListItem';

import {API} from 'aws-amplify';

const avatars = [
    require("../../../images/avatar_1.png"),
    require("../../../images/avatar_2.png"),
    require("../../../images/avatar_3.png"),
    require("../../../images/avatar_4.png"),
    require("../../../images/avatar_4.png")
];

class Screen extends Component {

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
        let actionValue = item.userAction.actionValue;
        item.userAction.actionValue = !actionValue;
        item.likeNum = !actionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
        this.setState({});
        this.props.like({
            id: item._id,
            field: 'likeNum',
            cancel: actionValue,
            callback: (data) => {
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
                        if (!item.userAction._id) {
                            item.userAction._id = res.data._id;
                            this.setState({});
                        }
                    }
                });
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
                                 clickAvatar={this.clickAvatar}
                                 like={this.like}
                                 opt={{item, index, hasData, Items}}
                                 pressItem={this.pressItem}/>
    };


    //  下滑刷新
    handleRefresh = () => {
        const {refreshing} = this.state;
        if (refreshing) {
            return false;
        }
        this.setState({
            refreshing: true
        });
        this.getList(this.state.Items.length, null, true);
    };

    // 上拉加载更多
    handleLoadMore = () => {
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
        this.getList(10, this.state.LastEvaluatedKey);
    };

    /**
     * 获取爆料列表数据和获取每条爆料条目对应用户的行为数据
     * @param limit 返回限制
     * @param LastEvaluatedKey 标识下一次请求从哪个条目开始
     * @param refresh 是否重新刷新
     * */
    getList = (limit, LastEvaluatedKey, refresh) => {
        this.props.getList({
            params: {
                limit: limit || 10,
                LastEvaluatedKey: LastEvaluatedKey || null
            },
            callback: (data) => {
                if (data.success) {
                    let {Items, Count, LastEvaluatedKey} = data.data;
                    Items.forEach((item, index) => {
                        // todo 用户信息怎么绑定
                        item.source = avatars[index % 5];
                        item.userName = '匿名';
                    });
                    this.setState({
                        Items: refresh ? [...Items] : [...(this.state.Items || []), ...Items],
                        Count: Count,
                        LastEvaluatedKey: LastEvaluatedKey,
                        loadMoreing: false,
                        refreshing: false
                    });

                    if (!LastEvaluatedKey) {
                        $toast('没有更多数据了!');
                    }

                    /////////// 获取用户行为集合
                    let params = [];
                    Items.forEach((item) => {
                        params.push({
                            objectId: item._id,
                            userId: this.props.user.id,
                            actionType: 1,   // 点赞
                            objectType: 3   // 爆料评论回复资源
                        })
                    });

                    // 查询用户对该资源的行为数据
                    this.props.getActions({
                        params,
                        callback: (res) => {
                            let userAction = res.data;
                            // console.log(params, '\\\n\\\\',res);
                            // 批量更新用户的点赞信息
                            this.state.Items.forEach((item) => {
                                item.userAction = userAction[item._id];
                            });
                            this.setState({});
                            console.log(this.state.Items);
                        }
                    });
                }
            }
        });
    };

    componentDidMount() {
        this.getList(10, null);
    }

    render() {
        const {refreshing, loadMoreing, Items} = this.state;
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <DoubleClicker onClick={this.titleDoubleClick}>
                        <Title style={styles.title}>Disclose</Title>
                    </DoubleClicker>
                    </Body>
                    <Right>
                        <Button transparent light onPress={this.writeDisclose}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('../../../images/btn_post.png')}/>
                        </Button>
                    </Right>
                </Header>
                {
                    Items ? <FlatList
                        ref={(flatlist) => this._flatList = flatlist}
                        initialNumToRender={4}
                        keyExtractor={(item, index) => item + index}
                        ListEmptyComponent={<Text>none data!</Text>}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh}
                            />
                        }
                        ItemSeparatorComponent={() => <View
                            style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                        data={Items}
                        renderItem={this.renderListItem}
                        refreshing={refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.1}
                    /> : <Content><Spinner color={'#408EF5'}/></Content>
                }
                {loadMoreing ? <Spinner color={'#408EF5'}/> : null}
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
