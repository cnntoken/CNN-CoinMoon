import React, {Component} from 'react';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from './components/ListTabBar'
// import List from './components/List'
// import RefreshList from 'app/components/RefreshListView/index2'
import RefreshListView, {RefreshState} from 'app/components/RefreshListView/index2';
import Item from './components/Item'
import i18n from 'app/i18n';

class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            info: {
                refreshState: RefreshState.Idle
            },
            news: {
                refreshState: RefreshState.Idle
            }
        };
        this.LastEvaluatedKey = {}
    }

    onRefresh = (category, params) => {
        this.setState({
            [category]: {
                refreshState: RefreshState.HeaderRefreshing
            }
        })
        this.props.getList({
            isRefresh: true,
            category,
            params: {
                userId: this.props.userId
            }
        },
        (LastEvaluatedKey) => {
            this.setState({
                [category]: {
                    refreshState: LastEvaluatedKey ? RefreshState.Idle : RefreshState.NoMoreData
                }
            })
            this.LastEvaluatedKey[category] = LastEvaluatedKey;
        },()=>{
            this.setState({
                [category]: {
                    refreshState: RefreshState.Failure
                }
            })
        })
    };
    onLoadMore = (category, params) => {
        // console.log('onloadmore', params)
        this.setState({
            [category]: {
                refreshState: RefreshState.FooterRefreshing
            }
        })
        this.props.getList({
                category,
                params: {
                    LastEvaluatedKey: this.LastEvaluatedKey[category],
                    userId: this.props.userId
                }
            },
            (LastEvaluatedKey) => {
                this.setState({
                    [category]: {
                        refreshState: LastEvaluatedKey ? RefreshState.Idle : RefreshState.NoMoreData
                    }
                })
                this.LastEvaluatedKey[category] = LastEvaluatedKey;
            },()=>{
                this.setState({
                    [category]: {
                        refreshState: RefreshState.Failure
                    }
                })
            })
    };

    // renderInfomationItem = ({item, separators})=>{
    //     return <Item info={item} key={item._id} onItemClick={this.goDetail}/>
    // }
    renderItem = (category,{item, index, separators, cat}) => {
        return <Item info={item}
                     key={item._id}
                     onLike={(...args)=>this.like(category,...args)}
                     onAvatarClick={this.goUserDetail}
                     onItemClick={this.goDetail}/>
    };

    goUserDetail = (info) => {
        this.props.navigation.navigate('OthersHome', {userInfo: info.user})
    };

    goDetail = (info) => {
        const {_id, category} = info;
        this.props.navigation.navigate('NewsDetail', {_id, category});
    };
    like = (category,item) => {
        if (!this.props.userId) {
            this.props.navigation.navigate('Login', {
                prevState: this.props.navigation.state
            });
            return;
        }
        let actionValue = item.userAction.actionValue;
        console.log(category,item)
        this.props.feedLike({
            category,
            params: item
        });
        // 更新用户对该资源的行为数据
        this.props.updateAction({
            _id: item.userAction._id,
            obj: {
                objectId: item._id,
                userId: this.props.userId,
                actionType: 1,  // 点赞
                objectType: 1,   //
                actionValue: !actionValue
            },
            callback: (res) => {
                // 如果没有userAction._id，则是第一次点赞，需要更新id
                if (!item.userAction._id) {
                    item.userAction._id = res._id;
                }
            }
        });
    };

    render() {
        return (
            <ScrollableTabView
                initialPage={this.state.pageIndex}
                renderTabBar={() => <ListTabBar/>}
            >
            {['info','news'].map((cate,index)=>{
                return <RefreshListView
                key={index}
                tabLabel={i18n.t(`page_main.category_${cate}`)}
                data={this.props[cate]}
                refreshState={this.state[cate].refreshState}
                renderItem={(...args)=>this.renderItem(cate,...args)}
                onHeaderRefresh={(...args) => {
                    this.onRefresh(cate, ...args)
                }}
                onFooterRefresh={(...args) => {
                    this.onLoadMore(cate, ...args)
                }}
                // 可选
                footerRefreshingText={i18n.t('disclose.footerRefreshingText')}
                footerFailureText={i18n.t('disclose.footerFailureText')}
                footerNoMoreDataText={i18n.t('disclose.footerNoMoreDataText')}
                footerEmptyDataText={i18n.t('disclose.footerEmptyDataText')}



                refreshControlNormalText={i18n.t('disclose.refreshControlNormalText')}
                refreshControlPrepareText={i18n.t('disclose.refreshControlPrepareText')}
                refreshControlLoadingText={i18n.t('disclose.refreshControlLoadingText')}
            />
            })}
                {/* <RefreshListView
                    tabLabel={i18n.t('page_main.category_news')}
                    data={this.props.news}
                    refreshState={this.state.news.refreshState}
                    renderItem={(...args)=>this.renderItem('news',...args)}
                    onHeaderRefresh={(...args) => {
                        this.onRefresh('news', ...args)
                    }}
                    onFooterRefresh={(...args) => {
                        this.onLoadMore('news', ...args)
                    }}

                    // 可选
                    footerRefreshingText={i18n.t('disclose.footerRefreshingText')}
                    footerFailureText={i18n.t('disclose.footerFailureText')}
                    footerNoMoreDataText={i18n.t('disclose.footerNoMoreDataText')}
                    footerEmptyDataText={i18n.t('disclose.footerEmptyDataText')}



                    refreshControlNormalText={i18n.t('disclose.refreshControlNormalText')}
                    refreshControlPrepareText={i18n.t('disclose.refreshControlPrepareText')}
                    refreshControlLoadingText={i18n.t('disclose.refreshControlLoadingText')}
                />
                <RefreshListView
                    tabLabel={i18n.t('page_main.category_info')}
                    data={this.props.info}
                    refreshState={this.state.info.refreshState}
                    renderItem={(...args)=>this.renderItem('info',...args)}
                    onHeaderRefresh={(...args) => {
                        this.onRefresh('info', ...args)
                    }}
                    onFooterRefresh={(...args) => {
                        this.onLoadMore('info', ...args)
                    }}

                    // 可选
                    footerRefreshingText={i18n.t('disclose.footerRefreshingText')}
                    footerFailureText={i18n.t('disclose.footerFailureText')}
                    footerNoMoreDataText={i18n.t('disclose.footerNoMoreDataText')}
                    footerEmptyDataText={i18n.t('disclose.footerEmptyDataText')}

                    refreshControlNormalText={i18n.t('disclose.refreshControlNormalText')}
                    refreshControlPrepareText={i18n.t('disclose.refreshControlPrepareText')}
                    refreshControlLoadingText={i18n.t('disclose.refreshControlLoadingText')}
                /> */}
            </ScrollableTabView>
        );
    }
}

export default ViewControl;
