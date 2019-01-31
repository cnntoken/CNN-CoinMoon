import React, {Component} from 'react';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from './components/ListTabBar'
import List from './components/List'
import Item from './components/Item'
import i18n from 'app/i18n';

class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
        };
        this.LastEvaluatedKey = {}
    }

    onRefresh = (category, params) => {
        this.props.getList({
                isRefresh: true, category, params: {
                    userId: this.props.userId
                }
            },
            (LastEvaluatedKey) => {
                this.LastEvaluatedKey[category] = LastEvaluatedKey;
            })
    };
    onLoadMore = (category, params) => {
        // console.log('onloadmore', params)
        this.props.getList({
                category,
                params: {
                    LastEvaluatedKey: this.LastEvaluatedKey[category],
                    userId: this.props.userId
                }
            },
            (LastEvaluatedKey) => {
                this.LastEvaluatedKey[category] = LastEvaluatedKey;
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
    onChangeTab = (index) => {
        this.setState({
            pageIndex: index
        })
    };

    render() {
        return (
            <ScrollableTabView
                initialPage={this.state.pageIndex}
                renderTabBar={() => <ListTabBar/>}
            >
                <List
                    tabLabel={i18n.t('page_main.category_news')}
                    data={this.props.news}
                    renderItem={(...args)=>this.renderItem('news',...args)}
                    hasMore={this.props.news_hasMore}
                    onRefresh={(...args) => {
                        this.onRefresh('news', ...args)
                    }}
                    onLoadMore={(...args) => {
                        this.onLoadMore('news', ...args)
                    }}
                />
                <List
                    tabLabel={i18n.t('page_main.category_info')}
                    data={this.props.info}
                    renderItem={(...args)=>this.renderItem('info',...args)}
                    hasMore={this.props.info_hasMore}
                    onRefresh={(...args) => {
                        this.onRefresh('info', ...args)
                    }}
                    onLoadMore={(...args) => {
                        this.onLoadMore('info', ...args)
                    }}
                />
            </ScrollableTabView>
        );
    }
}

export default ViewControl;
