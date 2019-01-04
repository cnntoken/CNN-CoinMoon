import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types'
import DoubleClicker from '../../../components/DoubleClicker'
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
import {View, TouchableHighlight, FlatList, ActivityIndicator, Image, PixelRatio} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";

import {API} from 'aws-amplify';

class PureListItem extends PureComponent{
    render(){
        const {item,index,hasData,list} = this.props.opt
        return (
            <ListItem avatar>
                {/* 左侧图标 */}
                <Left>
                    <Thumbnail small source={item.source}/>
                </Left>
                <Body style={{borderBottomWidth: 0}}>

                {/* 用户名& 发布时间& 编辑*/}
                <Grid>
                    <Row>
                        <Col size={5}>
                            <View style={styles.name}>
                                <Text>{item.userName}</Text>
                                <Text style={styles.time}>{item.time}</Text>     
                            </View>
                        </Col>
                        <Col size={1}>
                            <View style={styles.edit}>
                                <Button block transparent light onPress={this.view}>
                                    <Image source={require('../../../images/icon_more_black.png')} />
                                </Button>
                            </View>
                        </Col>
                    </Row>
                </Grid>
                <TouchableHighlight onPress={this.props.pressItem}>
                    <View>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text>{item.title}</Text>
                                </Col>
                            </Row>
                        </Grid>

                        {/* todo 九宫格组件待提出 */}
                        <Grid>

                            <Row>
                                {
                                    item.images.slice(0, 3).map((i, idx) => {
                                        return <Col style={styles.col_img} key={idx}>
                                            <Image style={styles.image}
                                                    source={{uri: i.uri}}/>
                                        </Col>
                                    })
                                }
                            </Row>

                            <Row>
                                {
                                    item.images.length > 3 ?
                                        item.images.slice(3, 6).map((i, idx) => {
                                            return <Col style={styles.col_img} key={idx}>
                                                <Image style={styles.image}
                                                        source={{uri: i.uri}}/>
                                            </Col>
                                        }) : null
                                }
                            </Row>


                            <Row>
                                {
                                    item.images.length > 6 ?
                                        item.images.slice(6, 9).map((i, idx) => {
                                            return <Col style={styles.col_img} key={idx}>
                                                <Image style={styles.image}
                                                        source={{uri: i.uri}}/>
                                            </Col>
                                        }) : null
                                }
                            </Row>

                        </Grid>

                    </View>


                </TouchableHighlight>

                {/* 点赞评论*/}
                <Grid>
                    <Col>
                        <View style={styles.interact}>
                            <Button transparent light onPress={this.view}>
                                <Image source={require('../../../images/icon_view.png')}/>
                                <Text style={styles.number}>{item.num1}</Text>
                            </Button>
                            <Button transparent light onPress={this.view}>
                                <Image source={require('../../../images/icon_comment_small.png')}/>
                                <Text style={styles.number}>{item.num2}</Text>
                            </Button>
                            <Button transparent light onPress={this.view}>
                                <Image source={require('../../../images/icon_like_small.png')}/>
                                <Text style={styles.number}>{item.num3}</Text>
                            </Button>
                            <Button transparent light onPress={this.view}>
                                <Image source={require('../../../images/icon_like_small.png')}/>
                                <Text style={styles.number}>{item.num4}</Text>
                            </Button>
                        </View>
                    </Col>
                    {/*<Button transparent light onPress={this.view}>*/}
                    {/*<Image source={require('../../../images/icon_view.png')}/>*/}
                    {/*</Button>*/}
                </Grid>
                
                {/* 无更多数据时,展示 */}
                {
                    (list.length - 1) != index ? null :
                    !(hasData&&list.length)?<Text style={styles.noData}>there is no more!</Text>:null
                }
                </Body>
            </ListItem>
        )
    }
}
class Screen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loadMore: false,
            hasData: true,
            list: props.list,
            
        }
    }
    // 双击导航标题,回到顶部
    titleDoubleClick = ()=>{
        console.log('double clicked')
        this._flatList.scrollToIndex({index: 0, viewPosition: 0})
    }
    // 写爆料
    writeDisclose = () => {
        console.log('写爆料');
        this.props.navigation.navigate('DisclosePublish');
    };

    pressItem = () => {
        console.log("presssss");
        this.props.navigation.navigate('DiscloseDetail');
    };
    // 下拉刷新
    handleRefresh = () => {
        console.log('pull down');
        const {refreshing} = this.state;
        const {list: initList} = this.props;
        this.setState({refreshing: true})
        // 如果已经处于加载中,下拉不做任何处理,即不会请求数据
        if(refreshing){
            return false;
        }
        // 模拟请求数据
        setTimeout(() => {
            this.setState({list: initList,hasData: true,refreshing: false})
        }, 2000);
    }
    // 上拉加载
    handleLoadMore = (info) => {
        console.log('load more');
        console.log(info);
        const {list,loadMore} = this.state;
        // 如果已经处于加载中,上拉不做任何处理,即不会请求数据
        if(loadMore){
            this.setState({list: [...list]})
            return false;
        }
        const {list: initList} = this.props;
        // this.props.fetchData()
        this.setState({loadMore: true})
        // 模拟请求数据
        setTimeout(() => {
            // 模拟无更多数据
            if(list.length >10){
                this.setState({hasData: false,loadMore: false})
            }else{
                this.setState({list: [...list,...initList],loadMore: false})
            }
        }, 2000);

    }
    // 渲染列表
    renderListItem = ({item,index}) => {
        const {hasData,list} = this.state;
        // 纯组件
        return <PureListItem opt={{item,index,hasData,list}} pressItem={this.pressItem} />
    }

    componentDidMount() {
        console.log('in disclose')
    }

    render() {

        // let {list} = this.props;
        const {refreshing,loadMore,list} = this.state;
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
                {/* <Content> */}
                <FlatList
                    ref={(flatlist)=>this._flatList = flatlist}
                    initialNumToRender={4}
                    keyExtractor={(item,index)=> item+index}
                    ListEmptyComponent={<Text>none date!</Text>}
                    ItemSeparatorComponent={()=><View style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1),backgroundColor: '#E6E6E6' }} />}
                    data={list}
                    renderItem={this.renderListItem}
                    onRefresh={this.handleRefresh}
                    refreshing={refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={-0.1}
                />
                {loadMore?<View style={styles.loadMore}><ActivityIndicator size='large' color='#408EF5' /></View>:null}
                {/* </Content> */}

            </Container>
        );
    }
}

export default Screen;
