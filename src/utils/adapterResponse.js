import {$get} from './fetch'


class USDStorage {
    constructor(){
        this.store = {}
        this.transUSDObj = {}
        this.interval = setInterval( ()=>{
            this.init()
        },5 * 60 * 1000)
    }
    init(){
        this.store = {}
    }
    addExchange(exchange){
        if(!this.transUSDObj[exchange]){
            this.transUSDObj[exchange] = {}
        }
    }
    addCoin(exchange,coin){
        if(!this.transUSDObj[exchange]){
            this.addExchange(exchange)
        }
        if(!this.transUSDObj[exchange][coin]){
            this.transUSDObj[exchange][coin] = `https://api.cryptowat.ch/markets/${exchange}/${coin}usd/price`
        }
    }
    addValue(key,value){
        this.store[key] = value
    }
    checkValue(key){
        if(!this.store[key]){
            return false
        } else {
            return true
        }
    }
}

/** 
 * res 需要适配的resposne
 * name_field  需要适配的字段名
*/
export const adapterResponse =  async (res,name_field) => {
    let res_length = res.length
    let field_length = name_field.length
    let REQ_API = {} //
    let toSendUrl = [] // 去重后需要再次请求的url地址
    let usdStore = new USDStorage()
    for(let k = 0; k < res_length; k++){
        REQ_API[k] = []

        let toExchange = res[k].exchange //交易所
        let toCoin = String(res[k].symbol).toLowerCase() //币
        usdStore.addCoin(toExchange,toCoin,)
        for(let i = 0; i < field_length; i++ ){
            let value = res[k][name_field[i]]
            REQ_API[k].push({url:value.url,path:value.path})
            let index = toSendUrl.indexOf(value.url)
            if(index>-1){
                //保存响应返回的数组索引
                REQ_API[k][i].resIndex = index
            } else {
                toSendUrl.push(value.url)
                REQ_API[k][i].resIndex = toSendUrl.length-1
            }
        }
    }

    let usd_keyArray = []
    let usd_urlArray = []
    for(let exchange in usdStore.transUSDObj){
        for(let coin in usdStore.transUSDObj[exchange]){
            if(!usdStore.checkValue(`${exchange}_${coin}`)){
                usd_keyArray.push(`${exchange}_${coin}`)
                usd_urlArray.push(usdStore.transUSDObj[exchange][coin])
            }
        }
    }

    try{
        let usd_res = await Promise.all(usd_urlArray.map(url => $get(url)).map((promise) => {
          return promise
            .then((res) => {
              return res
            })
            .catch((e) => {
                console.log(e)
                return {result:{
                    price:0
                }}
            });
        }));
        usd_res.forEach((item,index)=>{
            usdStore.addValue(usd_keyArray[index],item.result && item.result.price || 0)
        })
      }catch(e){
        console.log('e',e)
      }

    try{
        let remote_res = await Promise.all(toSendUrl.map(url => $get(url)))
        for(let k = 0; k < res_length; k++){
            for(let i = 0; i< field_length; i++){
                let seekPath = REQ_API[k][i].path
                res[k][`CNNOWN_${name_field[i]}`] = seekRealValue(remote_res[REQ_API[k][i].resIndex],seekPath)
                res[k][`CNNOWN_USD_value`] = usdStore.store[`${res[k].exchange}_${String(res[k].symbol).toLowerCase()}`] || 0
            }
        }
        return res
    }catch(e){
        console.log('e',e);
    }
}

export const seekRealValue = (data,path) => {
    let len = path && path.length
    let value = data
    try{
        for(let i = 0; i < len; i++){
            let v = Object.values(path[i])[0]
            value = value[v]
        }        
    }catch(e){
        console.log('e',e);
    }
    return value
}