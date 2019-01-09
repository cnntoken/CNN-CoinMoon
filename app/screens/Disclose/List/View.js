import React, {PureComponent, Component} from 'react';
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
    // List,
    ListItem, Icon, Switch, Thumbnail
} from "native-base";
import {
    View, TouchableOpacity, FlatList, ActivityIndicator, Image, PixelRatio,
} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";
import Modal from "react-native-modal";
import {$toast} from '../../../utils';

import * as navigationActions from 'app/actions/navigationActions';
import PureListItem from 'app/components/DiscloseListItem';

import {API} from 'aws-amplify';


const avatars = [
    require("../../../images/avatar_1.png"),
    require("../../../images/avatar_2.png"),
    require("../../../images/avatar_3.png"),
    require("../../../images/avatar_4.png"),
    require("../../../images/avatar_4.png")
];

class Screen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loadMore: false,
            hasData: true,
            list: [],
            // 一次请求多条回来，然后再分页
            Items: [],
            Count: 0,
            isModalVisible: false,
            activeItem: null
        }
    }

    // 双击导航标题,回到顶部
    titleDoubleClick = () => {
        console.log('double clicked');
        this._flatList.scrollToIndex({index: 0, viewPosition: 0})
    };
    // 写爆料
    writeDisclose = () => {
        this.props.navigation.navigate('DisclosePublish');
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

    like = (item) => {
        item.liked = true;
        item.likeNum = item.likeNum + 1;
        this.setState({
            list: [...this.state.list]
        });
        this.props.like({
            id: item._id,
            field: 'likeNum',
            callback: (data) => {
                console.log(data);
            }
        });
    };

    // 下拉刷新
    handleRefresh = () => {
        console.log('pull down');
        const {refreshing} = this.state;
        const {list: initList} = this.props;
        this.setState({refreshing: true});
        // 如果已经处于加载中,下拉不做任何处理,即不会请求数据
        if (refreshing) {
            return false;
        }
        // 模拟请求数据
        setTimeout(() => {
            this.setState({list: initList, hasData: true, refreshing: false})
        }, 2000);
    };

    // 上拉加载
    handleLoadMore = (info) => {
        console.log('load more');
        console.log(info);
        const {list, loadMore} = this.state;
        // 如果已经处于加载中,上拉不做任何处理,即不会请求数据
        if (loadMore) {
            this.setState({list: [...list]});
            return false;
        }
        const {list: initList} = this.props;
        // this.props.fetchData()
        this.setState({loadMore: true})
        // 模拟请求数据
        setTimeout(() => {
            // 模拟无更多数据
            if (list.length > 10) {
                this.setState({hasData: false, loadMore: false})
            } else {
                this.setState({list: [...list, ...initList], loadMore: false})
            }
        }, 2000);

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
                    let index = this.state.list.indexOf(item);
                    this.state.list.splice(index, 1);
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
        const {hasData, list} = this.state;
        // 纯组件
        return <PureListItem showDeleteDialog={this.showDeleteDialog}
                             clickAvatar={this.clickAvatar}
                             like={this.like}
                             opt={{item, index, hasData, list}}
                             pressItem={this.pressItem}/>
    };

    componentDidMount() {
        // console.log('in disclose');
        this.props.getList({
            // id: navigation.id,
            callback: (data) => {
                if (data.success) {
                    let {Items, Count} = data.data;
                    Items.forEach((item, index) => {
                        // todo 用户信息怎么绑定
                        item.source = avatars[index % 5];
                        item.userName = '匿名';
                    });
                    this.setState({
                        list: Items.slice(9),
                        Items: Items,
                        Count: Count
                    })
                }
            }
        });
    }

    render() {
        // let {list} = this.props;
        const {refreshing, loadMore, list} = this.state;

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


                <FlatList
                    ref={(flatlist) => this._flatList = flatlist}
                    initialNumToRender={4}
                    keyExtractor={(item, index) => item + index}
                    ListEmptyComponent={<Text>none data!</Text>}
                    ItemSeparatorComponent={() => <View
                        style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                    data={list}
                    renderItem={this.renderListItem}
                    onRefresh={this.handleRefresh}
                    refreshing={refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={-0.1}
                />

                {loadMore ?
                    <View style={styles.loadMore}><ActivityIndicator size='large' color='#408EF5'/></View> : null}


                {/*modal*/}
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
