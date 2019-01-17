import { put, call, select } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { $toast } from '../utils'
import * as Types from '../actions/types'
import userService from '../services/user'

export function* refresh({user}){
    try{
        if(!user){
            user = yield Auth.currentAuthenticatedUser({
                bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            });
        }
        userService.init(user);
        console.log('Auth.currentAuthenticatedUser success',user)
        // console.log(user.getUserContextData());
        const attr = user.attributes || {};
        const payload = user.signInUserSession && user.signInUserSession.idToken.payload
        const info = {
            attributes: payload ? {...payload,...attr} : attr,
            username: user.username,
            userDataKey: user.userDataKey
        };
        yield put({type: Types.SET_USER_INFO, info: info})
    }catch(e){
        yield put({type: Types.SET_USER_INFO, info: {}})
        console.log('Auth.currentAuthenticatedUser fail')
        console.log(e);
    }
}


export function* login({payload,callback}) {
    // check the current user when the App component is loaded
    console.log(payload,callback)
    const {email, password} = payload
    try{
        const user = yield Auth.signIn(email, password);
        yield put({type: Types.AUTH_REFRESH, user});
        console.log('user', user)
        callback()
    }catch(e){
        console.log('login fail')
        console.log(e);
        $toast(`登录失败: ${e.message}`)
        callback(e)
    }
}

export function* register({payload}) {
    console.log(payload)
    const {email, password} = payload;
    const essentialAttributes = userService.generateRandomAttributes();
    try{
        const res = yield Auth.signUp({
            username: email,
            password,
            attributes: {
                email,
                ...essentialAttributes
            },
            validationData: []  //optional
        })
        console.log('register res', res)
        $toast('注册成功')
    }catch(e){
        console.log('register fail')
        console.log(e);
        $toast(`注册失败: ${e.message}`)
    }
}


export function* verify({payload,callback}) {
    const {email, code} = payload
    try{
        $toast('正在验证邮箱, 请稍后...')
        const res = yield Auth.confirmSignUp(email, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        })
        console.log('verify res', res)

        callback()
    }catch(e){
        console.log('verify fail')
        console.log(e);
        $toast('验证失败')
    }
}

export function* resend({payload,callback}) {
    const {email} = payload
    console.log('resend email', email)
    try{
        const res = yield Auth.resendSignUp(email)
        console.log('resend res', res)
        $toast(`已经重新发送验证码, 请查看邮箱: ${email}`)
        callback()
    }catch(e){
        console.log('resend fail')
        console.log(e);
        $toast(`重发验证码失败: ${e.message}`)
    }
}


export function* logout({callback}) {
    try{
        const res = yield Auth.signOut()
        userService.destory();
        yield put({type: Types.SET_USER_INFO, info: {}})
        console.log('logout res', res)
        $toast('退出成功')
        callback && callback()
    }catch(e){
        console.log('logout fail')
        console.log(e);
        $toast('退出失败')
    }
}
