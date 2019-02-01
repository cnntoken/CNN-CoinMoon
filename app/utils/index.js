import Toast from '../components/Toast'

const moment = require('moment');

export const $toast = (msg) => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};


// 过滤对象组成的数组
export function uniqueById(items) {

    const map = new Map();
    items.forEach((item) => {
        if (!map.has(item._id)) {
            map.set(item._id, item);
        }
    });

    let Items = [...map.values()];

    Items.sort(function (item1, item2) {
        return -new Date(item1.updatedAt).valueOf() + new Date(item2.updatedAt).valueOf();
    });

    return Items;
}


// 根据创建日期获取秒数
export function getSeconds(createdAt) {
    return moment(createdAt).seconds();
}


// 根据创建日期获取秒数
export function getNumByUserId(userId) {
    return userId.charCodeAt();
}

export function formatDate(date) {
    let time = '';
    if (moment(new Date()).isSame(date, 'day')) {
        time = moment(date).format('HH:mm')
    } else {
        time = moment(date).format('YYYY-MM-DD HH:mm')
    }
    return time;
}

export function cloneByJson(data) {
    return JSON.parse(JSON.stringify(data));
}
