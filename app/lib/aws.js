import awsconfig from '../config/aws.conf';
import Amplify, { Auth, API } from 'aws-amplify';
const ApiGateWayName = 'stark';

console.log('=====  初始化Amplify配置 =====')
Amplify.configure(awsconfig);
// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);



export const $get = (url)=>{
    return new Promise((resolve,reject)=>{
        API.get(ApiGateWayName,url).then(res => {
            if(res.code === 200){
                resolve(res.result)
            }else{
                reject(res)
            }
        }).catch(error => {
            reject(error)
        });
    })
}

export const $post = (url,params)=>{
    return new Promise((resolve,reject)=>{
        API.post(ApiGateWayName,url,{
            body: params
        }).then(res => {
            if(res.code === 200){
                resolve(res.result)
            }else{
                reject(res)
            }
        }).catch(error => {
            reject(error)
        });
    })
}

export const $put = (url, params)=>{
    return new Promise((resolve,reject)=>{
        API.put(ApiGateWayName,url,{
            body: params
        }).then(res => {
            if(res.code === 200){
                resolve(res.result)
            }else{
                reject(res)
            }
        }).catch(error => {
            reject(error)
        });
    })
}

export const $delete = (url, params)=>{
    return new Promise((resolve,reject)=>{
        API.del(ApiGateWayName,url,{
            body: params
        }).then(res => {
            if(res.code === 200){
                resolve(res.result)
            }else{
                reject(res)
            }
        }).catch(error => {
            reject(error)
        });
    })
}

export {
    Auth,
    API
}