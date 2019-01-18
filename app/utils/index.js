import Toast from '../components/Toast'


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
    return [...map.values()];
}
