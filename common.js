// 基础包
// 将项目中所有的第三方引用包都放在基础包里面


import './shim';

import "react";
import "react-native";
import "axios";


// Mine
import "react-redux";
import "redux";
import "redux-logger";
import "redux-saga";
import "moment";
import "react-navigation";
import "i18n-js";
import "react-native-easy-grid";
import "react-native-fast-image";
import "react-native-image-crop-picker";
import "react-native-modal";
import "react-native-picker";
import "react-native-snap-carousel";
import "react-native-loading-spinner-overlay";
import "react-native-fit-image";
import "html-entities";
import "react-native-largelist-v3";
import "react-native-webview";
import "react-native-scrollable-tab-view";
import "react-native-spring-scrollview";
import "react-native-root-siblings";



// import "bitcoinjs-lib";


// // import "assert";
// // import "buffer";
// import "ethereumjs-util";
// // import "file-type";
// import "lodash";
// import "process";

// import "react-native-device-info";
//
//
// import "react-native-firebase";
//
// import "react-native-gesture-handler";
//
// import "react-native-languages";






// import "stream";
// import "util";
// import "uuid";


import React, {Component} from "react";
import {Text} from "react-native";
import EmptyExport from './common_patch.js';  // Requiring unknown module "node_modules_@babel_runtime_helpers_interopRequireDefault"


var _ = require(`lodash`);

Text.render = _.wrap(Text.render, function (func, ...args) {
    let hh = ``;
    let originText = func.apply(this, args);
    return React.cloneElement(originText, {allowFontScaling: false})
});
