import bitcoin,{bip32} from 'bitcoinjs-lib';
import bip39 from 'bip39';

/**
 * bitcoin 钱包管理(隔离见证 p2wpkh)
 */
class HDSegwitP2SHWallet{
    constructor(mnemonic){
        this.mnemonic = mnemonic;
        this.external_addresses_cache = {};
        this.internal_addresses_cache = {};
        this.path = "m/49'/0'/0'";
    }
    getXpub() {
        if (this._xpub) {
          return this._xpub; // cache hit
        }
        const seed = bip39.mnemonicToSeedSync(this.mnemonic);
        const root = bip32.fromSeed(seed);
        const child = root.derivePath(this.path).neutered();
        this._xpub = child.toBase58();
        return this._xpub;
    }
    getExternalWIFByIndex(index) {
        return this._getWIFByIndex(false, index);
    }
    
    getInternalWIFByIndex(index) {
        return this._getWIFByIndex(true, index);
    }
     /**
     * Get internal/external WIF by wallet index
     * @param {Boolean} internal
     * @param {Number} index
     * @returns {*}
     * @private
     */
    _getWIFByIndex(internal, index) {
        const seed = bip39.mnemonicToSeedSync(this.mnemonic);
        const root = bip32.fromSeed(seed);
        const path = `${this.path}/${internal ? 1 : 0}/${index}`;
        const child = root.derivePath(path);
        return child.toWIF();
    }

    getExternalAddressByIndex(index) {
        index = index * 1; // cast to int
        if (this.external_addresses_cache[index]) return this.external_addresses_cache[index]; // cache hit
    
        const node = bip32.fromBase58(this.getXpub());
        const targetNode = node.derivePath(`0/${index}`);
        // console.log(targetNode)
        const address = this._getAddressByNode(targetNode);
        // console.log(targetNode)
        console.log(targetNode.publicKey.toString('hex'))
        // console.log(targetNode.chainCode.toString('hex'))
        // console.log(targetNode.privateKey)
    
        return (this.external_addresses_cache[index] = address);
    }

    getInternalAddressByIndex(index) {
        index = index * 1; // cast to int
        if (this.internal_addresses_cache[index]) return this.internal_addresses_cache[index]; // cache hit
    
        const node = bip32.fromBase58(this.getXpub());
        const targetNode = node.derivePath(`1/${index}`);
        const address = this._getAddressByNode(targetNode);
    
        return (this.internal_addresses_cache[index] = address);
    }
   
    _getAddressByNode(node, network){
        // console.log(`_getAddressByNode: ${node.publicKey.toString('hex')}`)
        return bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey }),
            // network
          }).address
    }
}

HDSegwitP2SHWallet.type = 'HDsegwitP2SH';
HDSegwitP2SHWallet.typeReadable = 'HD SegWit (BIP49 P2SH)';

// const test = ()=>{
//     // const mnemonic = 'calm pill local giant average critic letter shiver deer rough mobile idea';
//     const mnemonic = 'inner original finish select link venture suffer glue fiscal tool actor subway';
//     const wallet = new HDSegwitP2SHWallet(mnemonic);
//     console.log(`master code xpub : ${wallet.getXpub()}`);
//     console.log(`wif at index 0 : ${wallet.getExternalWIFByIndex(0)}`);
//     let i=0;
//     while(i<10){
//         console.log(`address at index ${i} : ${wallet.getExternalAddressByIndex(i)}`);
//         i++;
//     }
// }

// test();

export default HDSegwitP2SHWallet;