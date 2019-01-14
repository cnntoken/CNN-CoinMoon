import {put, call, select} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';
import {$toast} from '../utils';
import * as Types from '../actions/types';
import * as services from '../services/userAction';
import * as navigationActions from 'app/actions/navigationActions';


//  查询用户行为集合
export function* getActions({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.getActions, params);
        if (callback) callback(res);
    } catch (e) {
        $toast(`upload image fail: ${e.message}`);
        if (callback) callback(e);
    }
}

// 更新行为
export function* update({payload}) {
    const {_id, obj, callback} = payload;
    try {
        const res = yield call(services.update, _id, obj);
        if (callback) callback(res);
    } catch (e) {
        // console.log('publish fail');
        $toast(`publish fail: ${e.message}`);
        if (callback) callback(e)
    }
}
