
/**
 * btc 钱包管理
 */
export default class BtcManage{
    constructor(info={}){
        this.has_mnemonic_backup = !!info.has_mnemonic_backup;
    }
    static generateByMnemonic(){
        return new BtcManage({has_mnemonic_backup: false})
    }
    /**
     * 获取当前钱包信息
     */
    async getCurrentWalletInfo(){

    }

}
