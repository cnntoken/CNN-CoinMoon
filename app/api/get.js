export default function post(path) {

    // console.log('请求参数:', path, params);
    let options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'get',
    };

    return fetch(path, options)
        .then((resp) => {
            return resp.json();
        })
        .then((resp) => {
            return resp;
        })
        .catch(error => {
            console.log('api:', error);
            return error
        });
}
