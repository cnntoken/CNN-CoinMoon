import {call} from 'redux-saga/effects';
import * as services from '../services/report';

// 举报
export function* report({payload}) {
    const {obj, callback} = payload;
    try {
        const res = yield call(services.report, obj);
        if (callback) callback(res);
    } catch (e) {
        console.log(e);
    }
}
