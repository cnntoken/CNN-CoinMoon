// 基础打包配置

const pathSep = require('path').sep;

function createModuleIdFactory() {
    const projectRootPath = __dirname;//获取命令行执行的目录，__dirname是nodejs提供的变量
    // console.log('\n', projectRootPath, '\n' ,pathSep);
    return path => {

        console.log(path);

        let name = '';
        if (path.indexOf('node_modules' + pathSep + 'react-native' + pathSep + 'Libraries' + pathSep) > 0) {
            name = path.substr(path.lastIndexOf(pathSep) + 1); //这里是去除路径中的'node_modules/react-native/Libraries/‘之前（包括）的字符串，可以减少包大小，可有可无
        } else if (path.indexOf(projectRootPath) == 0) {
            name = path.substr(projectRootPath.length + 1); //这里是取相对路径，不这么弄的话就会打出_user_smallnew_works_....这么长的路径，还会把计算机名打进去
        }
        name = name.replace('.js', '');//js png字符串没必要打进去
        name = name.replace('.png', '');
        let regExp = pathSep == '\\' ? new RegExp('\\\\', "gm") : new RegExp(pathSep, "gm");
        name = name.replace(regExp, '_');//把path中的/换成下划线

        // console.log(name);

        return name;
    };
}


module.exports = {

    serializer: {
        // 所有模块一经转换就会被序列化，Serialization会组合这些模块来生成一个或多个包，包就是将模块组合成一个JavaScript文件的包。
        // 函数传入的是你要打包的module文件的绝对路径返回的是这个module的id
        // 配置createModuleIdFactory让其每次打包都module们使用固定的id(路径相关)
        createModuleIdFactory: createModuleIdFactory
        /* serializer options */
    }
};
