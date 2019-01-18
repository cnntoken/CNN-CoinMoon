import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from './translations/en';
import zh from './translations/zh';
import ko from './translations/ko';

console.log(RNLanguages);
i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = {ko, en, zh};

export default i18n;
