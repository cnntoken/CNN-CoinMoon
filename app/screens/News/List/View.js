import React, {Component} from 'react';
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
    FooterTab,
    Footer
} from "native-base";
import {View} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from './components/ListTabBar'
import List from './components/List'
import Item from './components/Item'
class ViewControl extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    onChangeTab = (...args)=>{
        console.log('on change tab')
        console.log(...args)
    }
    onRefresh = (category,params)=>{
        console.log('onRefresh',params)
        this.props.getList({isRefresh: true,category})
    }
    renderInfomationItem = ({item, separators})=>{
        return <Item info={item} key={item._id}/>
    }
    renderNewsItem = ({item, separators})=>{
        return <Item info={item} key={item._id}/>
    }
    render() {
        console.log(this.props)
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ListTabBar/>}
                onChangeTab={this.onChangeTab}
                >
                <List 
                    tabLabel='新闻'
                    data={this.props.news}
                    renderItem={this.renderNewsItem}
                    onRefresh={(...args)=>{this.onRefresh('news',...args)}}
                ></List>
                <List tabLabel='信息'
                    data={this.props.info}
                    renderItem={this.renderInfomationItem}
                    onRefresh={(...args)=>{this.onRefresh('info',...args)}}
                >
                </List>
            </ScrollableTabView>
        );
    }
}

export default ViewControl;
