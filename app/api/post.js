export default function post(path, params) {

    console.log('请求参数:', path, params);
    let options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: params
    };

    return fetch(path, options)
        .then((resp) => {
            console.log(resp);
            return resp.json();
        })
        .then((resp) => {
            console.log(resp);
            return resp;
        })
        .catch(error => {
            console.log('api:', error);
            return error
        });
}
