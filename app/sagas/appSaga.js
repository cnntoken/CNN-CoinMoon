import { put} from 'redux-saga/effects';
import * as Types from '../actions/types'
import awsconfig from '../config/aws.conf';
import Amplify, {Auth} from 'aws-amplify';
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
    yield put({type: Types.AUTH_REFRESH})
}

