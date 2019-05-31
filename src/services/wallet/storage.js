import { AsyncStorage } from 'react-native';
import { getMaxListeners } from 'cluster';

const wallelt_storage_key = '@CNN_WSTORAGEK_INFO';
class Storage {
    constructor(){
        this.info = {};
        this.waitQueue = [];
    }
    init = async (callback)=>{
        if(this.pending){
            return new Promise((resolve,reject)=>{
                this.waitQueue.push(resolve)
            })
        }else{
            this.pending = true;
        }
        if(!this.info){
            const walletInfoStr = await AsyncStorage.getItem(wallelt_storage_key) || '{}';
            this.info = JSON.parse(walletInfoStr);
            this.pending = false;
            this.clearQueue();
        }
    }
    clearQueue = ()=>{
        while(this.waitQueue.length){
            const task = this.waitQueue.shift();
            task();
        }
    }
    setItem = async (key,value)=>{
        await this.init();
        this.info[key] = value;
        await this.synchronize();
    }

    getItem = async (key)=>{
        await this.init();
        return this.info[key];
    }

    synchronize = async ()=>{
        await AsyncStorage.setItem(wallelt_storage_key,JSON.stringify(this.info));
    }
}

export default new Storage();