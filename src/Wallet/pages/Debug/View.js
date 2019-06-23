import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    // NativeModules,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Title,
    // Spinner,
    // InputFocus,
    Modal,
    Switch,
} from '@components/NDLayout/index';
import services from '@services/wallet/index';
import {closeRNPage,$toast} from '@utils/CNNBridge'

export default class MainControl extends PureComponent {
    
    constructor(props){
        super(props)
        this.state = {
            debugInfo: {
                network: props.status.network === 'mainnet',
            },
            showConfirm: false,
            content: '',
            value: ''
        }
    }
    goBack = ()=>{
        const {debugInfo:{network}} = this.state
        const {status} = this.props
        if(status.network !== (network?'mainnet':'testnet')){
            closeRNPage()
        }else{
            this.props.navigation.pop()
        }
        
    }
    closeModal = () => {
        this.setState({ showConfirm: false,});
    };
    openModal = () => {
        this.setState({ showConfirm: true, });
    };

    debugInfoChange = (key, value)=>{
        console.log(key,value)
        this.setState({
            key,
            value,
            content: `Are you sure you want to change this: ${key}?`
        },()=>{
            this.openModal()
        })
        
        
    }
    handleCancel = ()=>{
        this.setState({
            key:'',
            value:'',
            content: '',
        },()=>{
            this.closeModal()
        })
    }
    handleConfirm = async()=>{
        console.log('confirmed')
        const {debugInfo,key,value} = this.state
        try {
            await services.changeNetwork(value)
            this.setState({
                debugInfo: {...debugInfo,[key]: value}
            },()=>{
                this.closeModal()
            })
        } catch (e) {
            console.log(e)
            $toast(e)
        }
        
    }
    render() {
        const {
            // debugInfo,
            showConfirm,
            content,
        } = this.state;
        // console.log(showImport)
        return (
            <Container>
                <Header 
                    title={()=><Title style={{textAlign:'center'}} txt='Debug' />}
                    rightClick={()=>null}
                    rightView={<View style={{width:24,height:24}} />}
                    leftClick={this.goBack}
                    leftView={<Image source={require('@images/icon_close.png')} style={{width:24,height:24}} />}
                />
                <Content>
                    <View style={styles.item}>
                        <Text>Is Main Network?</Text>
                        <Switch 
                            value={this.state.debugInfo.network}
                            onChange={(value)=>this.debugInfoChange('network',value)}
                        />
                    </View>
                </Content>
                {showConfirm&&<Modal
                    styleContent={{justifyContent:'flex-start',paddingTop: '30%'}}
                >
                    <View style={styles.modal_test}>
                        <View style={styles.item}>
                            <Text>{content}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button style={styles.btn_box} onPress={this.handleCancel}>
                                <Text style={styles.btn_txt}>Cancel</Text>
                            </Button>
                            <Button style={styles.btn_box} onPress={this.handleConfirm}>
                                <Text style={styles.btn_txt}>OK</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    btn_box: {
        backgroundColor: '#408EF5',
        width: 120,
        height: 50,
        flex: 0,
    },
    btn_txt: {
        color: '#fff',
    },
    
    item: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    
    
    modal_test: {
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 30,
        paddingBottom: 20,
        borderRadius: 8,
        // height: 170,
        backgroundColor: '#fff',
    },
    
});
