import bip39 from 'bip39';

// 随机生成一个助记词
export const getRandomMnemonic = ()=>{
    return bip39.generateMnemonic()

}