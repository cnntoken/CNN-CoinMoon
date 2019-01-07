// General api to access data
import ApiConstants from './ApiConstants';

/**
 *  封装fetch接口
 * */
export default function api(path, params, method, token) {

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

    let url = path.indexOf('http') === 0 ? path : ApiConstants.BASE_URL + path;

    console.log(options);

    return fetch(url, options)
        .then(resp => resp.json())
        .then(json => json)
        .catch(error => {
            console.log('api:', error);
            return error
        });
}


