import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ViewPropTypes,
    Platform,
    PixelRatio,
    RefreshControl
} from 'react-native'

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    EmptyData: 5,
};

const DEBUG = false;
const log = (text: string) => {
    DEBUG && console.log(text)
}

type Props = {
    refreshState: number,
    onHeaderRefresh: Function,
    onFooterRefresh?: Function,
    data: Array<any>,

    listRef?: any,

    footerRefreshingText?: string,
    footerFailureText?: string,
    footerNoMoreDataText?: string,
    footerEmptyDataText?: string,

    footerRefreshingComponent?: any,
    footerFailureComponent?: any,
    footerNoMoreDataComponent?: any,
    footerEmptyDataComponent?: any,

    renderItem: Function,
}

type State = {}

class Index extends PureComponent<Props, State> {
    constructor(props){
        super(props)
        this.state = {
            refreshing: false
        }
    }
    static defaultProps = {
        footerRefreshingText: '数据加载中…',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据',
        footerEmptyDataText: '暂时没有相关数据',

        refreshControlNormalText: '下拉刷新', // 正常状态
        refreshControlPrepareText: '松开加载', // 达到临界值, 松开即可触发刷新
        refreshControlLoadingText: '正在加载中...', // 加载中状态
    };
    onHeaderRefresh = () => {
        log('[RefreshListView]  onHeaderRefresh')

        if (this.shouldStartHeaderRefreshing()) {
            log('[RefreshListView]  onHeaderRefresh')
            this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
        }
    }

    onEndReached = (info: { distanceFromEnd: number }) => {
        log('[RefreshListView]  onEndReached   ' + info.distanceFromEnd)

        if (this.shouldStartFooterRefreshing()) {
            log('[RefreshListView]  onFooterRefresh')
            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
        }
    }

    shouldStartHeaderRefreshing = () => {
        log('[RefreshListView]  shouldStartHeaderRefreshing')

        if (this.props.refreshState === RefreshState.HeaderRefreshing || this.props.refreshState === RefreshState.FooterRefreshing) {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing = () => {
        log('[RefreshListView]  shouldStartFooterRefreshing')

        let {refreshState, data} = this.props
        if (data.length === 0) {
            return false
        }

        return (refreshState === RefreshState.Idle)
    }

    _onRefresh = ()=>{
        // console.log('--------------  触发onRefresh --------------')
        this.setState({
            refreshing: true,
            loadingText: this.props.refreshControlPrepareText
        })
    }
    _onScrollEndDrag = ()=>{
        if(this.state.refreshing){
           
           this.refreshData();
        }
    }
    refreshData = ()=>{
        this.setState({
            refreshing: true,
            loadingText: this.props.refreshControlLoadingText
        },()=>{
            // console.log('--------------  开始请求加载 --------------')
            this.onHeaderRefresh();
        })
    }
    componentDidUpdate(prevProps){
        const {data,refreshControlNormalText} = this.props;
        // 当data变动, 说明新数据已经加载完成
        if(data !== prevProps.data){
            this.setState({
                refreshing: false,
                loadingMore: false
            });
            setTimeout(()=>{
                this.setState({
                    loadingText: refreshControlNormalText
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
    render() {
        log('[RefreshListView]  render  refreshState:' + this.props.refreshState)

        let {renderItem, ListHeaderComponent, renderSeparator, ...rest} = this.props;
        
        return (
            <FlatList
                style={{
                    flex: 1
                }}
                ListHeaderComponent={ListHeaderComponent || null}
                ref={this.props.listRef}
                onEndReached={this.onEndReached}
                onRefresh={this.onHeaderRefresh}
                refreshing={this.state.refreshing}

                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                      title={this.state.loadingText}
                    />
                }
                onScrollEndDrag={this._onScrollEndDrag}
                ListFooterComponent={this.renderFooter}
                onEndReachedThreshold={0.1}
                ItemSeparatorComponent={() => <View
                    style={{height: 1 / PixelRatio.getPixelSizeForLayoutSize(1), backgroundColor: '#E6E6E6'}}/>}
                renderItem={renderItem}
                {...rest}
            />
        )
    }

    renderFooter = () => {
        let footer = null

        let {
            footerRefreshingText,
            footerFailureText,
            footerNoMoreDataText,
            footerEmptyDataText,

            footerRefreshingComponent,
            footerFailureComponent,
            footerNoMoreDataComponent,
            footerEmptyDataComponent,

        } = this.props

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<View style={styles.footerContainer}/>)
                break
            case RefreshState.Failure: {
                footer = (
                    <TouchableOpacity onPress={() => {
                        if (this.props.data.length === 0) {
                            this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
                        } else {
                            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }
                    }}
                    >
                        {footerFailureComponent ? footerFailureComponent : (
                            <View style={styles.footerContainer}>
                                <Text style={styles.footerText}>{footerFailureText}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )
                break
            }
            case RefreshState.EmptyData: {
                footer = (
                    <TouchableOpacity onPress={() => {
                        this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
                    }}
                    >
                        {footerEmptyDataComponent ? footerEmptyDataComponent : (
                            <View style={styles.footerContainer}>
                                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = footerRefreshingComponent ? footerRefreshingComponent : (
                    <View style={styles.footerContainer}>
                        <ActivityIndicator size="small" color="#888888"/>
                        <Text style={[styles.footerText, {marginLeft: 7}]}>{footerRefreshingText}</Text>
                    </View>
                )
                break
            }
            case RefreshState.NoMoreData: {
                footer = footerNoMoreDataComponent ? footerNoMoreDataComponent : (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
                    </View>
                )
                break
            }
        }

        return footer
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
})

export default Index
