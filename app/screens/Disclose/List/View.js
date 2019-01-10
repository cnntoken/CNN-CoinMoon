import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import DoubleClicker from '../../../components/DoubleClicker';
import styles from './styles';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Title,
    Footer,
    Spinner,
    // List,
    ListItem, Icon, Switch, Thumbnail
} from "native-base";
import {
    View, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator, Image, PixelRatio,
} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";
import Modal from "react-native-modal";
import {$toast} from '../../../utils';

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
        item.liked = true;
        item.likeNum = item.likeNum + 1;
        this.setState({
            Items: [...this.state.Items]
        });
        this.props.like({
            id: item._id,
            field: 'likeNum',
            callback: (data) => {
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


    handleRefresh = () => {
        const {refreshing} = this.state;
        if (refreshing) {
            return false;
        }
        this.setState({
            refreshing: true
        });
        this.props.getList({
            params: {
                // 向上拉刷新最新数据的话，则更新当前所有展示的Items个数
                limit: this.state.Items.length || 10,
                LastEvaluatedKey: null,
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
                        Items: [...Items],
                        Count: Count,
                        LastEvaluatedKey: LastEvaluatedKey,
                        refreshing: false
                    });

                    $toast('已是最新数据!');
                }
            }
        });
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

        this.props.getList({
            params: {
                limit: 10,
                LastEvaluatedKey: this.state.LastEvaluatedKey
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
                        Items: [...this.state.Items, ...Items],
                        Count: Count,
                        LastEvaluatedKey: LastEvaluatedKey,
                        loadMoreing: false
                    });

                }
            }
        });
    };


    componentDidMount() {
        this.props.getList({
            params: {
                limit: 10,
                LastEvaluatedKey: this.state.LastEvaluatedKey
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
                        Items: Items,
                        Count: Count,
                        LastEvaluatedKey: LastEvaluatedKey
                    })
                }
            }
        });
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
