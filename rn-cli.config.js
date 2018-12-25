
/**
 * 此配置文件是为了解决错误
 * 
 * Loading dependency graph...(node:23407) UnhandledPromiseRejectionWarning: Error: jest-haste-map: @providesModule naming collision:
    Duplicate module name: feed
 * 
 * 参考链接: https://github.com/janeasystems/nodejs-mobile-react-native/tree/ed727edea17e8a9e1a85cef3413becc83b8a0328#duplicate-module-name
 */
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver:{
    blacklistRE: blacklist([
    //   /nodejs-assets\/.*/,
    //   /android\/.*/,
    //   /ios\/.*/,
      /#current-cloud-backend\/.*/
    ])
  },
};