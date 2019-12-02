import { deviceInfo } from './utils/CNNBridge';
import i18n from 'i18n-js';
import moment from 'moment';
import en from './translations/en';
import ko from './translations/ko';
const lang = deviceInfo.lang;
i18n.locale = lang;
i18n.fallbacks = true;
i18n.translations = { ko, en };
i18n.defaultLocale = 'en';

const momentLocal = (lang)=>{
    let relativeTime = {
        future: '%s 후',
        past: '%s 전',
        s: '초',
        m: '1분',
        mm: '%d 분',
        h: '1시간',
        hh: '%d 시간',
        d: '1일',
        dd: '%d 일',
        M: '1개월',
        MM: '%d 개월',
        y: '1년',
        yy: '%d 년',
    };
    if (lang !== 'ko') {
        relativeTime = {
            future: 'after %s',
            past: '%s ago',
            s: 'seconds',
            m: '1 min',
            mm: '%%d min',
            h: '1 hour',
            hh: '%d hours',
            d: '1 day',
            dd: '%d days',
            M: '1 month',
            MM: '%d months',
            y: '1 year',
            yy: '%d years',
        };
    }
    
    moment.locale(lang, {
        relativeTime,
    });
}
momentLocal(lang)
export default i18n;


export const resetCurrentLocale = (lang)=>{
    if(!lang){
        return
    }
    i18n.locale = lang;
    momentLocal(lang)
}
