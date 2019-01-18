// General api to access data
import ApiConstants from './ApiConstants';
export * from './awsApi'
/**
 *  @desc 封装fetch接口
 *  @param path 请求路径，如果带有query参数，直接放到url中
 *  @param params 请求参数
 *  @param method 默认POST
 *  @param token  header头中带有的token
 * */
export default function api(path, params, method, token) {

    console.log('请求参数:', path, params, method, token);
    let options;
    options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token && {token: token})
        },
        method: method || 'POST',
        ...(params && {body: JSON.stringify(params)})
    };

    // todo 先写死URL 待确定后端真正的URL
    let url;
    if (path.indexOf('http') === 0) {
        url = path;
    } else {
        url = ApiConstants.BASE_URL + path;
    }


    return fetch(url, options)
        .then((resp) => {
            // console.log(resp);
            return resp.json();
        })
        .then((resp) => {
            // console.log(resp);
            return resp;
        })
        .catch(error => {
            // console.log('api:', error);
            return error
        });
}



