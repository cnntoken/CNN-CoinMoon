import React,{ PureComponent } from 'react';
import { FlatList,View,PixelRatio,RefreshControl } from 'react-native';



export default class List extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            refreshing: false,
            loadingText: '下拉刷新'
        }
    }
    _onLoadMore = ()=>{
        if(!this.props.hasMore || this.state.refreshing || this.loadingMore){
            return false;
        }
        this.props.onLoadMore()
    }
    refreshData = ()=>{
        this.setState({
            refreshing: true,
            loadingText: '加载中...'
        },()=>{
            // console.log('--------------  开始请求加载 --------------')
            this.props.onRefresh()
        })
    }
    _onRefresh = ()=>{
        // console.log('--------------  触发onRefresh --------------')
        this.setState({
            refreshing: true,
            loadingText: '松开刷新'
        })
    }
    _onScrollEndDrag = ()=>{
        if(this.state.refreshing){
            this.refreshData()
        }
    }
    componentDidUpdate(prevProps){
        const {data} = this.props;
        // 当data变动, 说明新数据已经加载完成
        if(data !== prevProps.data){
            this.setState({
                refreshing: false,
                loadingMore: false
            });
            setTimeout(()=>{
                this.setState({
                    loadingText: '下拉刷新'
                })
            },300)
        }
    }
    componentDidMount(){
        const {data} = this.props;
        if(!data || !data.length){
           this.refreshData();
        }
    }

    render(){
        const {refreshing,loadingText} = this.state;
        return <FlatList
                    data={this.props.data || []}
                    renderItem={this.props.renderItem}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onLoadMore}
                    refreshing={refreshing}
                    onScrollEndDrag={this._onScrollEndDrag}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={this._onRefresh}
                          title={loadingText}
                        />
                    }
                    keyExtractor={(item)=>item._id}
                    ItemSeparatorComponent={() => <View
                        style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                />
    }
}
