import React, {
    PureComponent
} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    DeviceEventEmitter,
    Platform
} from "react-native";
import {
    Header,
    Content,
    Button,
    Spinner,
} from '@components/NDLayout';
import MarketList from '../components/MarketList'
import i18n from '@i18n';
import styles from './styles'
import {goRNPage, getCurrentUser, isRNRootPage} from '@utils/CNNBridge'
import {NoticeMarketUpdate,adaptUserInfo,cnnLogger,debounce_next} from '@utils/index'
const LIMIT = 20
const isAndroid = Platform.OS === "android";


export default class SearchControl extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            inputVal: '',
            cate: 'search',
            searching: false,
            containerHeight: 0
        }
    }
    @debounce_next({delay:500})
    handleSearch = (value) => {
        const {inputVal} = this.state;
        value = value.replace(/\s/ig,'');
        if(inputVal === value){
            return false;
        }
        const obj = {
            searching: true,
            inputVal: value
        }
        if(!value){
            this.props.initSearchList();
            obj.searching = false;
            this.setState(obj)
            return false;
        }
        this.setState(obj)
        cnnLogger('search_pairs',{
            word: value
        })
        this.getList({count: LIMIT,category:'search',key_word:value,read_tag:'',page:0},()=>{
            this.setState({
                searching: false
            })
        },()=>{
            this.setState({
                searching: false
            })
        })
    }
    getList =  (obj, callback) => {
        this.props.searchCoin(obj,(no_more)=>{
            callback && callback(no_more)
            this.setState({
                [`${obj.category}_netError`]: false,
            })
        },()=>{
            // 网络错误
            this.setState({
                [`${obj.category}_netError`]: true,
            })
            callback && callback()
        })
    };

    handleRefresh = (category,successCallback,failCallback) => {
        this.getList({count:LIMIT,category,key_word:this.state.inputVal,read_tag:'',pahe:0},successCallback,failCallback)
    }
    handleLoadMore = (category,successCallback,failCallback) => {
        let page = this.props.search.page + 1
        this.getList({count:LIMIT,category,key_word:this.state.inputVal,read_tag:this.props[category].read_tag,isLoadmore:true,page},successCallback,failCallback)
    }
    goMarketDetail = (item) => {
        let currency = '' + item.symbol + (item.pair_name || '') + (item.exchange&&'/'+item.exchange|| '')
        cnnLogger('enter_pairs_detail',{
            from: 'search',  // search
            currency
        })
        goRNPage({
            moduleName:'stark_market_detail',
            params: {
                id: item.id,
                is_pair: item.is_pair,
                image: item.image,
                symbol: item.symbol,
                exchange: item.exchange,
                pair_name: item.pair_name,
                base_coin_id: item.base_coin_id
            }
        })
    }
    addCollection = ({id,index,type,info},successCallback) => {
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        cnnLogger('select_pairs',{
            pos: 'search',  // search
            pairs
        })
        this.props.addCollection({id,index,type},()=>{
            successCallback && successCallback()
            NoticeMarketUpdate('collectionAction',{id,action:'add'})
        })
    }
    removeCollection = ({id,index,type,info},successCallback) => {
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        cnnLogger('cancel_select_pairs',{
            pos: 'search',  // search
            pairs
        })
        this.props.removeCollection({id,index,type},()=>{
            successCallback && successCallback()
            NoticeMarketUpdate('collectionAction',{id,action:'remove'})
        })
    }
    goBack = () => {
        this.props.navigation.pop()
    }
    asyncUser = async() => {
        const newUser = await getCurrentUser({});
        this.setState({
            user: adaptUserInfo(newUser),
        })
    }
    componentDidMount = async() => {
        await this.asyncUser()

        this.userStateListener = DeviceEventEmitter.addListener('userStateChange',async()=>{
            await this.asyncUser()
            if(this.state.inputVal){
                this.setState({
                    searching: true
                })
                this.getList({count: LIMIT,category:'search',key_word:this.state.inputVal,read_tag:'',page:0},()=>{
                    this.setState({
                        searching: false
                    })
                })
            }
        });
    }
    componentWillUnmount = () => {
        isRNRootPage({
            moduleName: 'stark_market',
            isRoot: true
        })
        this.props.initSearchList();
        this.userStateListener.remove();
    }
    renderSearchRes = () => {
        let {searching,cate} = this.state
        let data = this.props.search
        if(searching){
            return <Spinner />
        } else if(data.list && data.list.length){
            return  <MarketList
                        user={this.state.user}
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
    handleContainerLayout = (event) => {
        if (isAndroid && this.state.containerHeight == 0) {
            this.setState({
                containerHeight: event.nativeEvent.layout.height
            });
        }
    }
    render() {
        return (<View
            style={isAndroid && this.state.containerHeight !== 0 ? {height: this.state.containerHeight} : {flex:1}}
            onLayout={this.handleContainerLayout}
        >
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
        </View>)
    }
}
