#!/usr/bin/env node

const path = require('path');
const commander = require('commander');
const modules = require('../ios/Stark/webapp/config.json');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
let fs = require('fs');

let ios_dest = './ios/Stark/webapp/bundles/';
let android_dest = './android/webapp/bundles/';

if (!fs.existsSync(ios_dest)){
    fs.mkdirSync(ios_dest);
}

if (!fs.existsSync(android_dest)){
    fs.mkdirSync(android_dest);
}

commander
    .version('0.0.1')
    .command('pack <command>')
    .option('--entry_file <entry_file>', 'entry-file', 'blue')
    .option('--output_name <output_name>', 'output_name', 'blue')
    .action(function (command, options) {
        switch (command) {

            case 'ios-common':
                (async function () {
                    const {stdout, stderr} = await exec(
                        `node ./node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file common.js --bundle-output ${ios_dest}platform.ios.bundle --assets-dest ios_dest --config  ${process.cwd()}/common.config.js`,
                        {maxBuffer: 1024 * 10000});

                    console.log(stdout, stderr);

                })();

                break;


            case 'ios-business':

                const tasks = modules.bundles.map(async (item) => {
                    console.log(item);
                    return await exec(
                        `node ./node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file src/${item.source}/entry.js --bundle-output ${ios_dest}${item.bundleName}  --assets-dest ${ios_dest} --config   ${process.cwd()}/business.config.js`,
                        {maxBuffer: 1024 * 10000});

                });

                Promise.all(tasks).then((results) => {
                    // console.log(results);
                });

                break;

            case 'android-common':
                (async function () {
                    const {stdout, stderr} = await exec(
                        `node ./node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file common.js --bundle-output ${android_dest}platform.android.bundle --assets-dest ${android_dest} --config  ${process.cwd()}/common.config.js`,
                        {maxBuffer: 1024 * 10000});
                    // console.log(stdout, stderr);

                })();

                break;



            case 'android-business':

                const tasks1 = modules.bundles.map(async (item) => {
                    // console.log(item);
                    return await exec(
                        `node ./node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file src/${item.source}/entry.js --bundle-output  ${android_dest}${item.bundleName_android}  --assets-dest ${android_dest} --config   ${process.cwd()}/business.config.js`,
                        {maxBuffer: 1024 * 10000});

                });

                Promise.all(tasks1).then((results) => {
                    // console.log(results);
                });

                break;

        }

    });

commander.parse(process.argv);
