import {$get,$post} from './fetch'

/** 
 * res 需要适配的resposne
 * name_field  需要适配的字段名
*/
export const adapterResponse =  async (res,name_field) => {
    let res_length = res.length
    let field_length = name_field.length
    let REQ_API = {} //
    let toSendUrl = [] // 去重后需要再次请求的url地址
    for(let k = 0; k < res_length; k++){
        REQ_API[k] = []
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
    try{
        let remote_res = await Promise.all(toSendUrl.map(url => $get(url)))
        for(let k = 0; k < res_length; k++){
            for(let i = 0; i< field_length; i++){
                let seekPath = REQ_API[k][i].path
                res[k][`CNNOWN_${name_field[i]}`] = seekRealValue(remote_res[REQ_API[k][i].resIndex],seekPath)
            }
        }
        return res
    }catch(e){
        console.log('eeeeee',e);
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