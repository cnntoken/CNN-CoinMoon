import React, {Component} from 'react';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from './components/ListTabBar'
import List from './components/List'
import Item from './components/Item'
import i18n from 'app/i18n';
import {$toast} from "../../../utils";

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

    like = (item) => {

        if (!this.props.userId) {
            this.props.navigation.navigate('Login', {
                prevState: this.props.navigation.state
            });
            return;
        }

        let actionValue = item.userAction.actionValue;
        let categorys = ['news', 'info'];
        this.props.feedLike({
            category: categorys[this.state.pageIndex],
            params: item,
            updateUserActionId: false
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
                // 如果没有userAction._id ，则是第一次点赞，需要更新id
                if (!item.userAction._id) {
                    item.userAction._id = res._id;
                    this.props.feedLike({
                        category: categorys[this.state.pageIndex],
                        params: item,
                        updateUserActionId: true
                    });
                }
            }
        });
    };

    renderItem = ({item, index, separators, cat}) => {
        return <Item info={item}
                     key={item._id}
                     onLike={this.like.bind(item)}
                     onAvatarClick={this.goUserDetail.bind(this, item)}
                     onItemClick={this.goDetail}/>
    };

    goUserDetail = (info) => {
        this.props.navigation.navigate('OthersHome', {userInfo: info.user})
    };

    goDetail = (info) => {
        const {_id, category} = info;
        this.props.navigation.navigate('NewsDetail', {_id, category})
        // console.log('goDetail', info)
    };

    onChangeTab = (index) => {
        this.setState({
            pageIndex: index
        })
    };

    componentDidMount() {
        // StatusBar.setBarStyle('light-content', true);
    }

    render() {
        // return <View><Text>hhh</Text></View>;
        return (
            <ScrollableTabView
                initialPage={this.state.pageIndex}
                renderTabBar={() => <ListTabBar/>}
                onChangeTab={this.onChangeTab}
            >
                <List
                    tabLabel={i18n.t('page_main.category_news')}
                    data={this.props.news}
                    renderItem={this.renderItem}
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
                    renderItem={this.renderItem}
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
