import {showToast, dispatchEvent, log2native} from './CNNBridge'
import discloseName from "@src/services/discloseName";
import {
    DeviceEventEmitter,
    Dimensions,
    Platform,
    ActionSheetIOS,
    NativeModules
} from 'react-native';
import {CNNRNEventEmitter} from '@utils/CNNBridge'
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


//
export function getNumByUserId(userId) {
    // let num = 0;

    // String(userId).replace(/[^0-9]/ig, "").split('').forEach((item) => {
    //     num += Number(item);
    // });

    return  Number(String(userId || 0).split('').pop());

    // return num;
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

export const debounce_next = (params = {}) => {
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
            return `${(Number(num) / 100000000).toFixed(2)}십억`
        } else if (Number(num) >= 10000) {
            // 万
            return `${(Number(num) / 10000).toFixed(2)}만`
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
        if (Number(num) >= 10000000) {
            // 大于等于一千万，用科学技术法表示，并保留4位小数
            // return Number(num).toExponential(4)
            return Number(num).toFixed(0)
        } else if (Number(num) < 10000000 && Number(num) >= 1000) {
            return Number(num).toFixed(3)
        } else if (Number(num) < 1000 && Number(num) >= 10) {
            return Number(num).toFixed(4)
        } else if (Number(num) < 10 && Number(num) > 1e-5) {
            return Number(num).toFixed(5)
        } else if (Number(num) <= 1e-5 && Number(num) > 0) {
            //小于等于0.00001，用科学计数法表示，并保留4位小数
            // return Number(num).toExponential(4)
            return Number(num).toFixed(7)
        } else if (Number(num) === 0) {
            return Number(num).toFixed(2)
        } else if (Number(num) < 0) {
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
// url query对象转参数字符串
export const qsStringify = (obj = {}) => {
    return Object.keys(obj).filter(k => obj[k] || +obj[k] === 0).map(k => {
        let value = obj[k];
        if (typeof value === 'object') {
            value = encodeURIComponent(JSON.stringify(value))
        } else {
            value = encodeURIComponent(value)
        }
        return `${encodeURIComponent(k)}=${value}`
    }).join('&');
}
// url query参数字符串转json对象
export const qsParse = (str) => {
    const obj = {};
    str.split('&').forEach(item => {
        const arr = item.split('=')
        obj[arr[0]] = decodeURIComponent(arr[1])
    })
    return obj;
}

// 适配用户数据格式
export const adaptUserInfo = (user) => {
    user = user || {};
    // 为了适配之前的数据格式
    user.picture = user.avatar;


    // user.id = user.id ;
    user.id = user.user_id;

    if (!user.name) {
        user.discloseName = discloseName(user.user_id);
    }
    user.discloseName = user.discloseName || discloseName(user.user_id);

    user.nickname = user.nickname || user.name;

    let avatarType = getNumByUserId(user.id);
    user.disclose_avatar = user.disclose_avatar || avatars[avatarType % 5];

    // 因为目前仅仅支持手机号注册登录
    user.isLogin = user.account_type === "sms" && !!user.token;
    user.icon = user.avatar ? {uri: user.avatar} : require('@images/avatar_default.png');

    return user;
};


// 通知原生列表数据改变
export const NoticeUpdateNativeList = (type, args, cb) => {
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

        if (cb) cb();

    } catch (e) {
        console.log(e);
    }
};

// market 自选操作在列表页与详情页事件监听
export const NoticeMarketUpdate = (funcName, args) => {
    try {
        DeviceEventEmitter.emit(funcName, args)
    } catch (e) {
        console.log(e);
    }
}

export const calculateStyleVariable = () => {
    // const isIphone = Platform.OS === 'ios'
    const {width: deviceWidth} = Dimensions.get('window')
    const scaleVariable = deviceWidth / 375
    return scaleVariable
};


export const ActionSheet = (options, callback) => {

    if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(options, callback);
    } else {
        NativeModules.ActionSheetAndroid.showActionSheetWithOptions(options.options, options.colors || ['#FF3B30', '#007AFF'], callback);
    }

};

export const isIOS = Platform.OS === 'ios';


export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

export const cnnLogger = (...args) => {
    log2native(...args);
};

export const splitNum = (num) => {
    let temp_num = Number(num)
    if(!isNaN(temp_num)){
        if(temp_num>10000000){
            return temp_num.toFixed(0)
        } else if(temp_num>=10){
            return temp_num.toFixed(2)
        } else if(temp_num>=1&&temp_num<10){
            return temp_num.toFixed(4)
        } else if(temp_num>0 && temp_num<1){
            let n =  temp_num.toFixed(8)
            if(n == 0){
                //如果8位小数仍然不够，则不做处理直接返回
                return temp_num
            } else {
                return n
            }
        } else if(temp_num < 0){
            let reciprocal = -1 * temp_num
            return -1 * splitNum(reciprocal)
        } else {
            return temp_num
        }
    } else {
        return num
    }
}

export const getUserStateChangeEventEmitter = ()=>{
    if (Platform.OS === 'ios') {
        return CNNRNEventEmitter;
    } else {
        return DeviceEventEmitter;
    }
}

export const marketCollectionEventEmitter = () => {
    if (Platform.OS === 'ios') {
        return CNNRNEventEmitter;
    } else {
        return DeviceEventEmitter;
    }
}

export const eventEmitterFromRNSelf = (funcName, args) => {
    try {
        DeviceEventEmitter.emit(funcName, args)
    } catch (e) {
        console.log(e);
    }
}

export const appTabChangeEventEmitter = () => {
    if (Platform.OS === 'ios') {
        return CNNRNEventEmitter;
    } else {
        return DeviceEventEmitter;
    }
}