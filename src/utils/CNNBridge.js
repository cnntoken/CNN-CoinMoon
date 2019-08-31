import {NativeModules, Platform,NativeEventEmitter} from 'react-native';
import {adaptUserInfo} from "@utils";
const {CNNRNBridgeManage,NativeLogger,CNNRNEventManage} = NativeModules;
// console.log('=============CNNRNEventManage=============',CNNRNEventManage)
/**
 * 关闭当前rn页面
 */
export const closeRNPage = async (obj) => {
    await CNNRNBridgeManage.closeRNPage(obj || {});
};


/**
 * 设置statusbar的背景色
 */
export const setStatusColor = async (color='#ffffff') => {
    if(Platform.OS === 'ios'){
        await CNNRNBridgeManage.changeStatusColor(color);
    }
};


/**
 * 跳转到其他rn页面
 * @param {Object} obj = {
 *  moduleName: 'stark_policy' //模块名
 *  params: {} // 传参是一个字典, 在目标页面在this.props当中接收
 * }
 */
export const goRNPage = (()=>{
    let prevModuleName = '';
    let time = Date.now();
    return (obj = {}) => {
        if (!obj.moduleName) {
            throw Error('moduleName is necessary')
        }
        const newTime = Date.now();
        const differ = newTime - time;
        if(obj.moduleName === prevModuleName && differ < 500){
            return false;
        }
        prevModuleName = obj.moduleName;
        time = newTime;
        if (!obj.params) {
            obj.params = {}
        }
        CNNRNBridgeManage.goRNPage(obj);
    }
})();

/**
 * 跳转native页面
 * @param {Object} obj = {
 *  moduleName: 'stark_login' // native页面名
 *  params: {} // 传参是一个字典, 在目标页面使用
 * }
 */
export const goNativePage = (()=>{
    let prevModuleName = '';
    let time = Date.now();
    return (obj = {}) => {
        if (!obj.moduleName) {
            throw Error('moduleName is necessary')
        }
        const newTime = Date.now();
        const differ = newTime - time;
        if(obj.moduleName === prevModuleName && differ < 500){
            return false;
        }
        prevModuleName = obj.moduleName;
        time = newTime;
        if (!obj.params) {
            obj.params = {}
        }
        CNNRNBridgeManage.goNativePage(obj);
    }
})();

/**
 * 用于在RN内部跳转的时候，Android需要知道当前页面是否为root页面
 * 暂时只有Market的Tab页需要这个额外的处理，其他的页面不需要
 * @param {*} params 
 */
export const isRNRootPage = (params) => {
    if (Platform.OS === 'android') {
        CNNRNBridgeManage.isRNRootPage(params);
    }
}

/**
 * 显示一个toast
 * @param {String} msg
 */
export const showToast = async (msg = '') => {
    return await CNNRNBridgeManage.showToast(msg);
};

/**
 * 设备信息
 */
export const deviceInfo = CNNRNBridgeManage.deviceInfo;

/**
 * 向native传递一个事件
 * @param {String} eventName
 * @param {Object} params
 * params = {
 *  type: '', // 事件类型 如: feed/feed_view_count_add
 *  id: '' // 操作id, feedid或者是discloseid. 如: 5ce77ce00000000000000000
 * }
 */
export const dispatchEvent = (eventName, params) => {
    CNNRNBridgeManage.eventEmit({eventName, params});
}


/**
 * 注册之后需要将user传到原生进行保存
 * @param {Object} user
 */
export const setUserInfo = async (user = {}) => {
    return await CNNRNBridgeManage.updateCurrentUser(user);
}

/**
 * 获取当前的user信息
 */
export const getCurrentUser = async () => {

    const userInfo = await CNNRNBridgeManage.getCurrentUser({});

    return adaptUserInfo(userInfo);

}

/**
 * 退出登录
 */
export const logout = async () => {
    return await CNNRNBridgeManage.logout({});
}



export const log2native = async (eventName, params = {})=>{
    return NativeLogger.log(eventName, params)
}


export const CNNRNEventEmitter = new NativeEventEmitter(CNNRNEventManage);
