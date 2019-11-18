import React, { PureComponent } from 'react'
import { 
    Image,
    Text,
    View,
    StyleSheet,
    // TextInput,
    PixelRatio,
 } from "react-native";

import {
    Container,
    Header,
    Content,
    Footer,
    // Underline,
    // List,
    Button,
    Title,
} from '@components/NDLayout'
import i18n from '@i18n';
import service from '@services/wallet/index';
import {cnnLogger,$toast} from '@utils/index';

const Shuffle = (mnemonic)=>{
    const arr = mnemonic.split(' ')
    let m = arr.length,i;
    while(m){
        i = (Math.random() * m--) >>> 0; // 取整
        [arr[m],arr[i]] = [arr[i],arr[m]]
    }
    return arr
}
export default class ViewControl extends PureComponent {
    state = {
        canSubmit: false,
        words: [],
        mnemonic: this.props.navigation.state.params.mnemonic,
        candidate: Shuffle(this.props.navigation.state.params.mnemonic)
    }

    goWalletMain = ()=>{
        this.props.navigation.navigate('WalletMain', {
            prevState: this.props.navigation.state,
        });
    }
    
    handleDone = async()=>{
        const {words,mnemonic} = this.state
        const str = words.join(' ');
        if(str === mnemonic){
            await service.backupMnemonic();
            // 成功备份助记词
            cnnLogger('backup_success')
            this.goWalletMain()

        }else{
            $toast(i18n.t('page_wallet.verify_fail'))
        }
    }
    clickRemove = (index,item)=>{
        console.log('clickRemove: ',index,item)
        const {words,candidate} = this.state
        const newWords = words.filter((v,i)=>!(i===index&&v===item))
        const newCandidate = [...candidate,item]
        console.log('newWords: ',newWords)
        this.setState({
            words: newWords,
            candidate: newCandidate,
        })
    }
    cilckWord = (index,item)=>{
        console.log('cilckWord: ',index,item)
        const {words,candidate} = this.state
        const newWords = [...words,item]
        const newCandidate = candidate.filter((v,i)=>!(i===index&&v===item))
        this.setState({
            words: newWords,
            candidate: newCandidate,
        })
    }
    render() {
        const {canSubmit,words,candidate} = this.state
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                                style={{ width: 12, height: 23 }}
                            />}
                    title={()=><Title txt={i18n.t('page_wallet.confirm_mnemonic')} />}
                />
                <Content>
                    <View style={styles.tips}>
                        <Image
                            source={require('@images/wallet_img_03.png')}
                        />
                        <Title style={styles.tips_title} txt={i18n.t('page_wallet.confirm_mnemonic')} />
                        <Text style={styles.tips_txt}>{i18n.t('page_wallet.backup_info_confirm')}</Text>
                        <View style={styles.words_view}>
                            {words.map((item,index)=>(<Button key={index} style={[styles.words_item,styles.words_select]} onPress={()=>this.clickRemove(index,item)}>
                            <Text style={[styles.words_t,styles.words_select_t]}>{item}</Text>
                        </Button>))}
                        </View>
                        <View style={styles.candidate}>
                            {candidate.map((item,index)=>(<Button key={index} style={styles.words_item} onPress={()=>this.cilckWord(index,item)}>
                                <Text style={styles.words_t}>{item}</Text>
                            </Button>))}
                        </View>
                    </View>
                </Content>
                <Footer>
                    <Button key={canSubmit} style={styles.btn} disabled={canSubmit} onPress={this.handleDone}>
                        <Text style={styles.color_w}>{i18n.t('page_wallet.done')}</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    color_w: {
        color: '#fff',
        fontSize: 18,
    },
    tips: {
        paddingTop: 17,
        paddingLeft: 24,
        paddingRight: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tips_title: {
        color: '#333',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 19,
    },
    tips_txt: {
        color: '#333',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 19,
    },
    words_view: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 15,
        marginTop: 19,
        width: '100%',
        // height: 140,
        minHeight: 80,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    words_item: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 12,
        marginBottom: 12,
        // width: 62,
        flex: 0,
    },
    words_t: {
        color: '#666',
        fontSize: 16,
        lineHeight: 23,
    },
    words_select: {
        backgroundColor: '#408EF5'
    },
    words_select_t: {
        color: '#fff',
    },
    candidate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // height: 105,
    },
    btn: {
        borderRadius: 16,
        backgroundColor: '#408EF5',
        height: 56,
    }
});