/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService';

export function navigateToHome(params) {
    NavigationService.navigate('Home', params);
}

// 跳往爆料列表页面
export function navigateToDiscloseList(params) {
    NavigationService.navigate('DiscloseList', params);
}


// 跳到个人中心
export function navigateToDiscloseDetail(params) {
    NavigationService.navigate('DiscloseDetail', params);
}


// 跳到个人中心
export function navigateToMine(params) {
    NavigationService.navigate('Mine', params);
}
