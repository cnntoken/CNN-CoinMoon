import React, { PureComponent } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    // NativeModules,
} from "react-native";
import {
    Container,
    Header,
    Content,
    // Footer,
    Underline,
    List,
    // Button,
    // Title,
} from '@components/NDLayout'
// import Modal from 'react-native-modal';
import i18n from '@i18n';
import {
    debounce_next,
} from "@utils/index";
// const { CNNRNBridgeManage } = NativeModules;

export default class SearchControl extends PureComponent {
    state = {
        params: {
            key_word: '',
            page: 1,
            pageSize: 20,
        },
        list: [],
        loading: false,
    }
    goWalletTransaction = (type)=>{
        this.props.navigation.navigate('WalletTransactionList', {
            prevState: this.props.navigation.state,
            type
        });
    }
    renderItem = (item)=>(<TouchableOpacity>
        <View style={styles.item}>
            <View style={styles.item_center}>
                <Image 
                    source={{uri: item.icon}}
                    style={styles.prefix_img}
                />
                <Text style={styles.item_txt}>{item.name}</Text>
            </View>
            <View>
                <Image 
                    source={item.isImported?require('@images/wallet_icon_added.png'):require('@images/wallet_icon_add.png')}
                />
            </View>
        </View>
        <Underline />
    </TouchableOpacity>)

    @debounce_next({delay:1000})
    handleSearch = (value) => {
        const {params} = this.state
        this.setState({
            key_word: value
        })
        if(params.key_word.trim() === value.trim() || !value.trim()){
            return false
        }
        this.getList({...params,key_word: value})
    }
    getList = (params)=>{
        this.setState({loading: true})
        this.props.dispatch({
            type: 'WALLET/getSearchList',
            payload: params,
            callback: (res)=>{
                console.log('callback done: ',res)
                if(res){
                    this.setState({
                        list: [...this.state.list,...res.data],
                        loading: false,
                    })
                }else{
                    this.setState({
                        loading: false,
                    })
                }
                
            }
        })
    }
    render() {
        const {list} = this.state
        return (<Container>
            <Header 
                title={()=><TextInput 
                            style={styles.input}
                            placeholder={i18n.t('page_wallet.search')}
                            placeholderTextColor='#999'
                            onChangeText={this.handleSearch}
                        />}
                leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                            />}
            />
            <Content>
                <Underline style={styles.line} />
                <ScrollView>
                    <List 
                        dataSource={list}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
                
            </Content>
        </Container>)
    }
}



const styles = StyleSheet.create({
    input: {
        width: 295,
        height: 30,
        backgroundColor: '#E6E6E6',
        borderRadius: 8,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 13,
        lineHeight: 19,
    },
    item: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    item_center: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    item_txt: {
        fontSize: 18,
        marginLeft: 10,
        textAlign: 'left',
    },
    line: {
        backgroundColor: '#f5f5f5',
        height: 10,
    },
    prefix_img: {
        height: 40,
        width: 40,
    },
    text_w: {
        color: '#fff',
    },
    
});