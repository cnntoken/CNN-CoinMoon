import {deviceInfo} from './utils/CNNBridge'
import i18n from 'i18n-js';

import en from './translations/en';
import zh from './translations/zh';
import ko from './translations/ko';

i18n.locale = deviceInfo.lang;
i18n.fallbacks = true;
i18n.translations = {ko, en, zh};

export default i18n;
