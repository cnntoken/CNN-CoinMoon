import React, { Component } from 'react'
import {
    View,
    FlatList,
    Text,
    ActivityIndicator
} from "react-native";
import styles from './styles';
import DiscussItem from '../DiscussItem/index'
import i18n from '@i18n';
import {
    Button 
} from '@components/NDLayout'
import {cnnLogger} from '@utils/index';


const LIMIT = 10
export default class ViewControl extends Component {
    constructor(props){
        super(props)
        this.state = {
            showFoot: props.dataSource.length < LIMIT ? 2 : 0, // 0: 仍可加载， 1: 正在加载， 2:没有更多数据了，不可加载; 3:网络错误
            loadingMore: false
        }
    }
    like_discuss = (id,count,index) => {
        cnnLogger('like_discussion',{
            pairs:this.props.pairs,
            discussion_id:id
        })
        this.props.like_discuss(id,count,index)
    }
    cancel_like_discuss = (id,count,index) => {
        cnnLogger('cancel_like_discussion',{
            pairs:this.props.pairs,
            discussion_id:id
        })
        this.props.cancel_like_discuss(id,count,index)
    }
    deleteDiscuss = (id,index) => {
        cnnLogger('delete_discussion',{
            pairs:this.props.pairs,
            discussion_id:id
        })
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
                    clickComment={()=>this.props.clickComment(item,index)}
                    showViewAll={this.props.showViewAll}
                    pairs={this.props.pairs}
                    hideDiscussDetail={this.props.hideDiscussDetail}
                />
    }
    handleLoadMore = () => {
        if(!this.props.handleLoadMore){
            return null
        }
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
            },()=>{
                this.setState({
                    loadMoreing: false,
                    refreshing: false,
                    showFoot: 3
                })
            })
        }
    }
    renderFooterText = () => {
        let { showFoot } = this.state
        switch(showFoot){
            case 0:
                return null
            case 1:
                return i18n.t('page_market_detail.loading')
            case 2:
                return i18n.t('page_market_detail.discussfooterNoMoreDataText')
            case 3:
                return i18n.t('page_market_detail.footerFailureText')
            default:
                return null
        }
    }
    // 底部
    _createListFooter = () => {
        // if(!this.state.loadingMore) return null
        return (
            <View style={styles.footerView}>
                {
                    this.props.showLoadMoreBtn 
                    && !this.state.loadingMore 
                    && this.state.showFoot !== 2
                    && this.state.showFoot !== 3
                    ?   <Button style={styles.loadmore_btn} onPress={this.handleLoadMore}><Text style={styles.loadmore_text}>{i18n.t('page_market_detail.discuss_load_more')}</Text></Button>
                    :   null
                }
                {this.state.showFoot === 1 && <ActivityIndicator size="small" color="#888888"/>}
                <Text>
                {this.renderFooterText()}
                </Text>
            </View>
        )
    }

    render() {
        const { dataSource} = this.props
        return (
                <View style={{flex:1,paddingLeft:15}}>
                    <FlatList 
                        style={{flex:1}}
                        user={this.props.user}
                        keyExtractor={(item)=>item.id}
                        data={dataSource}
                        renderItem={this._renderItem}
                        ListFooterComponent={this._createListFooter}
                    />
                </View>
        )
    }
}