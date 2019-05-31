import {showToast, dispatchEvent} from './CNNBridge'
import discloseName from "@src/services/discloseName";
import {DeviceEventEmitter} from 'react-native';
import avatars from '@services/constants';

const moment = require('moment');

export const $toast = (msg) => {
    showToast(msg)
};


// 过滤对象组成的数组
export function uniqueById(items) {

    const map = new Map();
    items.forEach((item) => {
        if (!map.has(item.id)) {
            map.set(item.id, item);
        }
    });
    return [...map.values()];
}


// 根据创建日期获取秒数
export function getSeconds(createdAt) {
    return moment(createdAt).seconds();
}


// 根据创建日期获取秒数
export function getNumByUserId(userId) {
    let num = 0;

    String(userId).replace(/[^0-9]/ig, "").split('').forEach((item) => {
        num += Number(item);
    });

    return num;
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

export const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            console.log('==debounce run==')
            fn.apply(context, args)
        }, delay)
    }
};

export const debounce_next = function (params = {}) {
    return function (target, name, descriptor) {
        let timer = null
        const {
            delay = 300, immediate = false
        } = params

        // high order function
        if (!descriptor || (arguments.length === 1 && typeof target === 'function')) {
            return createDebounce(target)
        }

        function createDebounce(fn) {
            return function debounce() {
                if (immediate && !timer) {
                    fn.apply(this, arguments)
                }
                if (timer) {
                    clearTimeout(timer)
                }

                let argumentsCopy = arguments
                let that = this

                timer = setTimeout(function () {
                    if (!immediate) {
                        fn.apply(that, argumentsCopy)
                    }
                    timer = null
                }, delay)
            }
        }

        // 修饰类内的箭头函数
        if (descriptor.initializer) {
            return {
                enumerable: false,
                configurable: true,
                get: function () {
                    return createDebounce(descriptor.initializer.call(this))
                }
            }
        }

        return descriptor
    }
}


export const throttle = (fn, delay) => {
    let timer = null,
        startTime = Date.now();
    return function () {
        let curTime = Date.now(),
            remaining = delay - (curTime - startTime);
        const context = this,
            args = arguments;

        timer && clearTimeout(timer);

        if (remaining <= 0) {
            fn.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(fn, remaining);
        }

    }
};

export const numWithUnit = (num = 0) => {
    if (typeof Number(num) === 'number' && !Number.isNaN(num)) {
        if (Number(num) >= 100000000) {
            // 亿
            return `${(Number(num)/100000000).toFixed(2)} 亿`
        } else if(Number(num) >= 10000){
            // 万
            return `${(Number(num)/10000).toFixed(4)} 万`
        } else {
            return formateNum(Number(num))
        }
    } else {
        return '--'
    }
}

// 处理数字，
export const formateNum = (num = 0) => {

    if (typeof Number(num) === 'number' && !Number.isNaN(num)) {
        if (Number(num) >= 1000) {
            return Number(num).toFixed(2)
        } else if(Number(num) >= 10){
            return Number(num).toFixed(4)
        } else if(Number(num)<10 && Number(num)>0){
            return Number(num).toFixed(5)
        } else if(Number(num)===0){
            return Number(num).toFixed(2)
        } else if(Number(num) < 0){
            let temp = formateNum(Number(num) * -1)
            return temp * -1
        }
    } else {
        return '--'
    }

}

// 反转数组
export const swapReverse = (arr) => {
    let left = null, right = null
    let length = arr.length
    for (left = 0; left < length / 2; left++) {
        right = length - 1 - left
        let temp = arr[left]
        arr[left] = arr[right]
        arr[right] = temp
    }
    return arr
}

// 适配用户数据格式
export const adaptUserInfo = (user) => {
    user = user || {};
    // 为了适配之前的数据格式
    user.picture = user.avatar;
    user.id = user.user_id;

    if (!user.name) {
        user.discloseName = discloseName(user.user_id);
    }
    user.discloseName = discloseName(user.user_id);

    user.nickname = user.name;

    let avatarType = getNumByUserId(user.id);
    user.disclose_avatar = avatars[avatarType % 5];

    // 因为目前仅仅支持手机号注册登录
    user.isLogin = user.account_type === "sms" && !!user.token;
    user.icon = user.avatar ? {uri: user.avatar} : require('@images/avatar_default.png');

    return user;
};


// 通知原生列表数据改变
export const NoticeUpdateNativeList = (type, args) => {
    try {

        const targetId = args.id ? args.id : args.params ? args.params.id : '';
        console.log(`================= CNN_TOPIC_STATUS_CHANGE =================`, {
            type,
            id: targetId,
            data: args.data
        });

        DeviceEventEmitter.emit(type, {
            id: targetId,
            params: args.params || args.data || {},
        });

        dispatchEvent("CNN_TOPIC_STATUS_CHANGE", {type, id: targetId, data: args.data || {}});

    } catch (e) {
        console.log(e);
    }
};
// market 自选操作在列表页与详情页事件监听
export const NoticeMarketUpdate = (funcName,args) => {
    try{
        DeviceEventEmitter.emit(funcName,args)
    }catch(e){
        console.log(e);
    }
}
