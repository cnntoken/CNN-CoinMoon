import React, { Component } from 'react'
import {
    View,
    FlatList,
    Text,
    ActivityIndicator
} from "react-native";
import styles from './styles';
import DiscussItem from '../DiscussItem/index'

const LIMIT = 10
export default class ViewControl extends Component {
    constructor(props){
        super(props)
        this.state = {
            showFoot: props.dataSource.length < LIMIT ? 2 : 0, // 0: 仍可加载， 1: 正在加载， 2:没有更多数据了，不可加载
            loadingMore: false
        }
    }
    _largeList;
    like_discuss = (id) => {
        this.props.like_discuss(id)
    }
    cancel_like_discuss = (id) => {
        this.props.cancel_like_discuss(id)
    }
    deleteDiscuss = (id,index) => {
        this.props.deleteDiscuss(id,index)
    }
    _renderItem = ({item,index}) => {
        return <DiscussItem 
                    key={item.id}
                    info={item} 
                    index={index}
                    user={this.props.user}
                    like_discuss={this.like_discuss}
                    cancel_like_discuss={this.cancel_like_discuss}
                    deleteDiscuss={this.deleteDiscuss}
                    hideAction={this.props.hideAction}
                    clickComment={this.props.clickComment}
                    navigation={this.props.navigation}
                    showViewAll={this.props.showViewAll}
                />
    }
    handleLoadMore = () => {
        // 不处于正在加载更多 && 有下拉刷新过
        if (!this.state.loadingMore && this.props.dataSource.length > 0 && this.state.showFoot !== 2) {
            this.setState({
                loadingMore: true,
                showFoot: 1,
            })
            this.props.handleLoadMore((length)=>{
                this.setState({
                    showFoot: length === 0 ? 2 : 0,
                    loadingMore: false
                })
            })
        }
    }
    // 空数据
    _createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    {/* 暂无数据 */}
                </Text>
            </View>
        );
    }
    // 底部
    _createListFooter = () => {
        return (
            <View style={styles.footerView}>
                {this.state.showFoot === 1 && <ActivityIndicator/>}
                <Text style={{color: '#ccc'}}>
                {
                    this.state.showFoot === 0
                    ?   null
                    :   (this.state.showFoot === 1 ? 'loading' : 'no more') 
                }
                </Text>
            </View>
        )
    }

    render() {
        const { dataSource} = this.props
        return (
                <View style={{flex:1,paddingLeft:15}}>
                    {
                        <FlatList 
                            user={this.props.user}
                            keyExtractor={(item)=>item.id}
                            data={dataSource}
                            renderItem={this._renderItem}
                            ListEmptyComponent={this._createEmptyView}
                            ListFooterComponent={this._createListFooter}
                            onEndReached={() => this.handleLoadMore()}
                            onEndReachedThreshold={0.1}
                        />
                    }
                </View>
        )
    }
}