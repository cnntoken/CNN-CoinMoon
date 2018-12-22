import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Types from '../actions/types'
import awsconfig from '../../aws-exports';
import Amplify, {Auth, Hub} from 'aws-amplify';

/**
 * 初始化Amplify配置
 */
export default function* appInit() {
    console.log('=====  初始化Amplify配置 =====')
    Amplify.configure(awsconfig);
    // retrieve temporary AWS credentials and sign requests
    Auth.configure(awsconfig);
    // yield call(Auth.currentAuthenticatedUser, {bypassCache: false})
    // check the current user when the App component is loaded
    try{
        const user = yield Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        });
        console.log('Auth.currentAuthenticatedUser success',user)
        console.log(user.getUserContextData());
        const info = {
            attributes: user.attributes,
            username: user.username,
            userDataKey: user.userDataKey
        }
        yield put({type: Types.SET_USER_INFO, info: info})
    }catch(e){
        yield put({type: Types.SET_USER_INFO, info: {}})
        console.log('Auth.currentAuthenticatedUser fail')
        console.log(e);
    }
    // Auth.currentAuthenticatedUser({
    //     bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    // }).then(user => {
    //     console.log('Auth.currentAuthenticatedUser success')
    //     console.log(user);
        
    // }).catch(e => {
       
    // });
}

