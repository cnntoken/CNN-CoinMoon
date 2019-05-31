/*
    上传打包的ipa或者apk
    node scripts/upload-package.js path='/Users/tangliang/Desktop/develop/newsDog/19/02/Stark(7).ipa' type=ios
    node scripts/upload-package.js path='/Users/tangliang/Projects/NewsDog/cnn/Stark/android/app/build/outputs/apk/release/app-release.apk' type=android changelog=''
    node scripts/upload-package.js path='/Users/liguangwei/code/newsdog/Stark/android/app/build/outputs/apk/release/app-release.apk' type=android changelog='bug fix'
    node scripts/upload-package.js path='/Users/liguangwei/Desktop/Stark/Stark.ipa' type=ios
*/
const request = require('request')
const fs = require('fs');
const $post = (uri,params={})=>{
    var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        uri,
        json: true,
        body: params
    };
    return new Promise((resolve,reject)=>{
        request(options, (error,res,body)=>{
            if(error){
                reject(res)
            }else{
                resolve(body)
            }
        });
    })
}

const $uploadWithFormData = (uri,params={})=>{
    var options = {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        uri,
        json: true,
        formData: params
    };
    return new Promise((resolve,reject)=>{
        request(options, (error,res,body)=>{
            if(error){
                console.error('upload failed:', error);
                reject(error)
            }else{
                resolve(body)
            }
        });
    })
}

const getProcessParams = ()=>{

    const arr = process.argv.slice(2);
    const obj = {};
    arr.forEach(item=>{
        let params = item.split('=');
        if(params.length === 2){
            obj[params[0]] = params[1];
        }
    })

    return obj
}
const run = async ()=>{
    const initObj = getProcessParams();
    if(!fs.existsSync(initObj.path)){
        throw new Error(`path=${initObj.path} is invalid, it must be a absolute path and exist`)
    }
    if(initObj.type !== 'ios' && initObj.type !== 'android'){
        throw new Error(`type=${initObj.type} is invalid, it must be android or ios`)
    }
    // if(!initObj.bundle_id){
    //     throw new Error(`bundle_id=${initObj.bundle_id} is invalid`)
    // }
    const res1 = await $post('http://api.fir.im/apps',{type: initObj.type, bundle_id: 'com.cnntoken.coinmoon',api_token: 'xxxxxxxxxxxxx'});
    const {type,cert:{binary}} = res1;
    // console.log(res1)
    const paramsObj = {
        key: binary.key,
        token: binary.token,
        file: fs.createReadStream(initObj.path),
        'x:changelog': initObj.changelog || '',
        'x:name': 'CoinMoon',
        'x:version': '1.0.1',
        'x:build': new Date().toISOString()
    };
    if(type === 'ios'){
        paramsObj['x:release_type'] = 'Adhoc'
    }
    // console.log(paramsObj)
    const res2 = await $uploadWithFormData(binary.upload_url,paramsObj)
    // console.log(res2);
    if(res2.is_completed){
        const firUrl = `https://fir.im/${res1.short}?release_id=${res2.release_id}`;
        console.log(firUrl)
    }else{
        console.log('upload failed')
    }
}

run()
