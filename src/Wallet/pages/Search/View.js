import React, { PureComponent } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Platform,
    // ScrollView,
    // NativeModules,
} from "react-native";
import {
    Container,
    Header,
    Content,
    // Footer,
    Underline,
    Spinner,
    // List,
    // Button,
    // Title,
} from '@components/NDLayout'
// import Modal from 'react-native-modal';
import i18n from '@i18n';
import {
    debounce_next, 
    cnnLogger,
    $toast,
} from "@utils/index";
import { LargeList } from "react-native-largelist-v3";
// import RefreshHeader from '@components/LargeList/RefreshHeader';
import LoadingFooter from '@components/LargeList/LoadingFooter';
import services from '@services/wallet/index';
import FastImage from 'react-native-fast-image';



const {height: viewportHeight,width: viewWidth} = Dimensions.get('window');

export default class SearchControl extends PureComponent {
    state = {
        params: {
            key_word: '',
            read_tag: '',
            count: 12,
        },
        list: [],
        allLoaded: false,
        index: 0,
        scrollEnabled: true,
        loading: false,
        importedList: [],
    }
    _largeList = null;
    componentDidMount(){
        this.reRender = this.props.navigation.addListener('willFocus', async () => {
            const importedList = await services.getErc20TokenList();
            this.setState({
                importedList
            })
        })
    }
    componentWillUnmount() {
        this.reRender;
        this.setState = () => {
            return;
        };
    }
    goWalletTransaction = (type)=>{
        this.props.navigation.navigate('WalletTransactionList', {
            prevState: this.props.navigation.state,
            type
        });
    }

    _renderItem = ({ section: section, row: row }) => {
        const {list,importedList} = this.state
        const item = list[section].items[row]
        const isImported = importedList.findIndex((value)=>value.contract === item.contract) > -1;
        // console.log(item.icon)
        return (<View>
            <View style={styles.item}>
                <View style={styles.item_center}>
                    <FastImage 
                        source={{uri: item.icon}}
                        style={styles.prefix_img}
                    />
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item_txt}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.add2token(isImported,item)}>
                    <Image 
                        source={isImported?require('@images/wallet_icon_added.png'):require('@images/wallet_icon_add.png')}
                    />
                </TouchableOpacity>
            </View>
            <Underline />
        </View>)
    }
    add2token = async(isImported,token)=>{
        console.log(isImported,token)
        try {
            if(isImported){
                // 已添加过
                return false
            }
            // 添加加密货币
            cnnLogger('add_cryptocurr',{
                cryptocurr: JSON.stringify(token)
            })
            await services.addToken(token)
            this.props.navigation.navigate('WalletMain', {
                prevState: this.props.navigation.state,
            });
        } catch (e) {
            console.log(e)
            $toast(i18n.t('page_wallet.add_fail'))
        }
    }
    _onLoading = async() => {
        const {params,list:old} = this.state
        let index = this.state.index
        const items = old[index].items
        params.read_tag = items[items.length - 1]['id'];
        try {
            const res = await services.searchToken(params)
            this.setState({
                index: index+1,
                list: [...old,{items: res}],
                allLoaded: (index===0&&res.length<params.count)||(!res.length)
            },()=>{
                this._largeList.endLoading();
            })
        } catch (err) {
            console.log(err)
            this._largeList.endLoading();
        }
    };
    clickFocus = ()=>{
        // 点击加密货币搜索框
        cnnLogger('click_search_cryptocurr')
    }

    @debounce_next({delay:50})
    handleSearch = (value) => {
        const {params} = this.state
        const newParams = {...params,key_word: value}
        this.setState({
            key_word: value,
            params: newParams,
            index: 0,
            allLoaded: false,
        })
        if(params.key_word.trim() === value.trim() || !value.trim()){
            return false
        }
        // 开始搜索
        cnnLogger('search_cryptocurr',{
            word: value,
        })
        this.getList({...newParams,read_tag: ''})
    }
    getList = async(params)=>{
        // this.setState({loading: true})
        try {
            const res = await services.searchToken(params)
            // console.log(res)
            this.setState({
                list: [{items: res}],
                // loading: false,
            })
        } catch (err) {
            console.log(err)
            this.setState({
                // loading: false,
            })
        }
    }
    render() {
        const {list,allLoaded,scrollEnabled,loading} = this.state
        // console.log(list)
        return (<Container>
            <Header 
                title={()=><TextInput 
                            style={styles.input}
                            placeholder={i18n.t('page_wallet.search')}
                            placeholderTextColor='#999'
                            onChangeText={this.handleSearch}
                            onFocus={this.clickFocus}
                        />}
                leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                                style={{ width: 12, height: 23 }}
                            />}
            />
            <Content>
                <Underline style={styles.line} />
                <View style={styles.scroll_height}>
                    {loading?<Spinner style={{marginTop:20}} />:null}
                    {list.length?<LargeList
                        ref={ref => (this._largeList = ref)}
                        data={list}
                        heightForSection={() => 0}
                        // renderSection={this._renderSection}
                        heightForIndexPath={() => 60}
                        renderIndexPath={this._renderItem}
                        // refreshHeader={RefreshHeader}
                        // onRefresh={this._onRefresh}
                        loadingFooter={LoadingFooter}
                        onLoading={this._onLoading}
                        allLoaded={allLoaded}
                        scrollEnabled={scrollEnabled}
                        // renderHeader={this._renderHeader}
                        // renderFooter={this._renderFooter}
                    />:<Text>
                        {/* {i18n.t('page_wallet.no_transaction')} */}
                    </Text>}
                </View>
            </Content>
        </Container>)
    }
}



const styles = StyleSheet.create({
    input: {
        // flex: 1,
        width: '100%',
        height: Platform.OS === 'ios' ? 30 : 36,
        backgroundColor: '#E6E6E6',
        borderRadius: 8,
        // textAlign: 'center',
        // marginTop: 10,
        // marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 13,
        // lineHeight: 30,
    },
    scroll_height: {
        flex: 1,
        // height: viewportHeight - 70,
        // width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#ddd',
    },
    item: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: '#ccc',
    },
    item_center: {
        alignItems: 'center',
        flexDirection: 'row',
        // width: 300,
    },
    item_txt: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
        maxWidth: viewWidth * 0.6,
    },
    line: {
        backgroundColor: '#f5f5f5',
        height: 10,
    },
    prefix_img: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    text_w: {
        color: '#fff',
    },
    
});