import Toast from '../components/Toast'


export const $toast = (msg)=>{
    Toast.show(msg,{
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
}