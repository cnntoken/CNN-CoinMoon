
import {getRandomMnemonic} from './util';
import BtcManage from './btcManage';
import EthManage from './ethManage';


class BaseManage {
    constructor(){
      
    }

    /**
     * 通过密码同时创建bitcoin和eth两个钱包
     * 针对bitcoin钱包: 默认采用隔离见证进行创建
     * @param {String} password 用于加密保存助记词
     */
    async createWalletByPassword(password=''){
        const mnemonic = getRandomMnemonic();
        const btcInstance = BtcManage.generateByMnemonic(mnemonic);
        const ethInstance = EthManage.generateByMnemonic(mnemonic);

    }

    /**
     * 获取当前的资产列表
     */
    async getAssetsList(){

    }



    async getBaseInfo(){
        return {
            has_mnemonic_backup: false, // 是否已经备份助记词
            has_eth_wallet: false, // 是否拥有eth钱包
            has_btc_wallet: false // 是否拥有btc钱包
        }
    }



    /**
     * 搜索以太坊token
     */
    async searchToken(){

    }

    /**
     * 
     */
    async addToken(){

    }

    /**
     * 
     */
    async removeToken(){

    }

}



export default new BaseManage();