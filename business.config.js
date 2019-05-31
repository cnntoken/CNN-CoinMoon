// 业务代码
const pathSep = require('path').sep;
// 这里简单暴力地吧preclude和node_modules目录下的文件全部过滤掉，只打自己写的代码。
// 只有自己写的才算是业务代码
function postProcessModulesFilter(module) {
    // console.log(module['path']);
    const projectRootPath = __dirname;
    if (module['path'].indexOf('__prelude__') >= 0) {
        return false;
    }
    if (module['path'].indexOf(pathSep + 'node_modules' + pathSep) > 0) {
        if ('js' + pathSep + 'script' + pathSep + 'virtual' == module['output'][0]['type']) {
            return true;
        }
        if (module['path'].indexOf(pathSep + 'node_modules' + pathSep + '@babel'
            + pathSep + 'runtime' + pathSep + 'helpers') > 0) {//添加这个判断，让@babel/runtime打进包去
            return true;
        }
        return false;
    }
    return true;

}

function createModuleIdFactory() {
    // 定义项目根目录路径，
    const projectRootPath = __dirname;
    return path => {
        console.log('path ', path);
        let name = '';
        if (path.indexOf('node_modules' + pathSep + 'react-native' + pathSep + 'Libraries' + pathSep) > 0) {
            name = path.substr(path.lastIndexOf(pathSep) + 1);
        } else if (path.indexOf(projectRootPath) == 0) {
            name = path.substr(projectRootPath.length + 1);
        }
        name = name.replace('.js', '');
        name = name.replace('.png', '');
        let regExp = pathSep == '\\' ? new RegExp('\\\\', "gm") : new RegExp(pathSep, "gm");
        name = name.replace(regExp, '_');//把path中的/换成下划线

        return name;
    };
}

///////////////////////////////////////////////////// 业务包中打入第三方module start  /////////////////////////////////////////////////////
// 如果要打入第三方module就需要修改过滤规则,新的配置如下：
// const noFilterModules = [/*你不想过滤的第三方模块名*/];
// 比如react-navigation的依赖如下
// const noFilterModules = ['react-navigation','clamp','create-react-context',
//     'hoist-non-react-statics','path-to-regexp','query-string','react-lifecycles-compat',
//     'react-native-safe-area-view','react-native-screens','react-navigation-deprecated-tab-navigator',
//     'react-navigation-drawer','react-navigation-stack','react-navigation-tabs',
//     'decode-uri-component','strict-uri-encode','isarray','hoist-non-react-statics',
//     'react-native-tab-view','react-native-drawer-layout-polyfill','react-navigation-stack',
//     'gud'
// ];
// 所以非常需要一个工具来帮忙计算依赖树，大概的思路就是读取package-lock.json然后计算出一个module依赖的其他所有module，并过滤掉基础包依赖的所有module。
// function packageToBundle(path){
//     for(let i=0;i<noFilterModules.length;i++) {
//         let moduleName = noFilterModules[i];
//         if (path.indexOf(pathSep + 'node_modules' + pathSep + moduleName) > 0) {
//             return true;
//         }
//     }
//     return false;
// }
//
// function postProcessModulesFilter(module) {//返回false则过滤不编译
//     const projectRootPath = __dirname;
//     if(module['path'].indexOf('__prelude__')>=0){
//         return false;
//     }
//     if(module['path'].indexOf(pathSep+'node_modules'+pathSep)>0){
//         if(packageToBundle(module['path'])){
//             return true;
//         }
//         if('js'+pathSep+'script'+pathSep+'virtual'==module['output'][0]['type']){
//             return true;
//         }
//         return false;
//     }
//     return true;
// }
///////////////////////////////////////////////////// 业务包中打入第三方module end  /////////////////////////////////////////////////////


module.exports = {

    serializer: {
        // 函数传入的是你要打包的module文件的绝对路径返回的是这个module的id
        createModuleIdFactory: createModuleIdFactory,
        // A filter function to discard specific modules from the output.
        // 数传入的是module信息，返回是boolean值，如果是false就过滤不打包
        // 配置processModuleFilter过滤基础包打出业务包
        processModuleFilter: postProcessModulesFilter
        /* serializer options */
    }
};
