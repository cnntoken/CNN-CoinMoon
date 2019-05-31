import {NativeModules} from 'react-native';
import discloseName from "@services/discloseName";
import {adaptUserInfo} from "@utils";

const {CNNRNBridgeManage} = NativeModules;

/**
 * 关闭当前rn页面
 */
export const closeRNPage = async () => {
    CNNRNBridgeManage.closeRNPage({});
}

/**
 * 跳转到其他rn页面
 * @param {Object} obj = {
 *  moduleName: 'stark_policy' //模块名
 *  params: {} // 传参是一个字典, 在目标页面在this.props当中接收
 * }
 */
export const goRNPage = (obj = {}) => {
    if (!obj.moduleName) {
        throw Error('moduleName is necessary')
    }
    if (!obj.params) {
        obj.params = {}
    }
    CNNRNBridgeManage.goRNPage(obj);
};


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
export const dispatchEvent = (eventName, params)=>{
    CNNRNBridgeManage.eventEmit({eventName,params});
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