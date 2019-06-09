import React, {
    PureComponent
} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Spinner,
} from '@components/NDLayout';
import MarketList from '../components/MarketList'
import i18n from '@i18n';
import styles from './styles'
import {goRNPage} from '@utils/CNNBridge'
import {NoticeMarketUpdate} from '@utils/index'

const LIMIT = 10

export default class SearchControl extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            cate: 'search',
            searching: false
        }
    }

    handleSearch = (value) => {
        this.setState({
            searching: true
        })
        const {inputVal} = this.state
        // console.log('handleSearch: ', inputVal,value)
        this.setState({
            inputVal: value
        })
        if(inputVal.trim() === value.trim() || !value.trim()){
            this.props.initSearchList()
            this.setState({
                searching: false
            })
            return false
        }
        this.getList({count: LIMIT,category:'search',key_word:value,read_tag:''},()=>{
            this.setState({
                searching: false
            })
        })
    }
    getList =  (obj, callback) => {
        this.props.getList(obj,()=>{
            callback && callback()
        })
    };
    handleRefresh = (category,callback) => {
        this.getList({count:LIMIT,category,key_word:this.state.inputVal,read_tag:''},callback)
    }
    handleLoadMore = (category,callback) => {
        this.getList({count:LIMIT,category,read_tag:this.props[category].read_tag,isLoadmore:true},callback)
    }
    goMarketDetail = (item) => {
        goRNPage({
            moduleName:'stark_market_detail',
            params: {
                id: item.id,
                is_pair: item.is_pair
            }
        })
    }
    addCollection = (id) => {
        this.props.addCollection(id,()=>NoticeMarketUpdate('collectionAction',{id,action:'add'}))
    }
    removeCollection = (id) => {
        this.props.removeCollection(id,()=>NoticeMarketUpdate('collectionAction',{id,action:'remove'}))
    }
    goBack = () => {
        // closeRNPage()
        this.props.navigation.pop()
    }
    componentWillUnmount = () => {
        this.props.initSearchList()
    }
    renderSearchRes = () => {
        let {searching,cate} = this.state
        let data = this.props.search
        if(searching){
            return <Spinner />
        } else if(data.list && data.list.length){
            return  <MarketList
                        user={this.props.user}
                        data={data.list}
                        supportSort={false} // 只有币种排行支持排序，自选列表不支持
                        type={cate}
                        showOrder={false}
                        tabLabel={i18n.t(`page_market.category_${cate}`)}
                        handleRefresh={this.handleRefresh}
                        handleLoadMore={this.handleLoadMore}
                        goMarketDetail={this.goMarketDetail}
                        addCollection={this.addCollection}
                        removeCollection={this.removeCollection}
                        showAction={true}
                        allLoaded={this.props.search.no_more}
                    />
        } else if(data.list && data.list.length === 0 && data.no_search_res){
            return <View style={styles.no_result}><Text>{i18n.t('page_market_search.no_search_res')}</Text></View>
        } else {
            return null
        }
    }
    render() {
        return (<Container>
            <Header 
                leftView={null}
                rightView={null}
                style={styles.header}
                styleBar={{display: 'none'}}
            >
                <View style={styles.search}>
                    <View style={styles.left}>
                        <Image 
                            style={{width:20,height:20}}
                            source={require('@images/search_gray.png')}
                        />
                        <TextInput 
                            style={styles.input}
                            autoFocus={true}
                            placeholder={i18n.t('page_market_search.search_placeholder')}
                            placeholderTextColor='#979797'
                            // value={inputVal}
                            onChangeText={this.handleSearch}
                        />
                    </View>
                    <View style={styles.right}>
                        <Button transparent onPress={this.goBack}>
                            <Text style={styles.cancel}>{i18n.t('page_market_search.search_cancle')}</Text>
                        </Button>
                    </View>
                </View>
            </Header>
            <Content>
                {this.renderSearchRes()}
            </Content>
        </Container>)
    }
}
