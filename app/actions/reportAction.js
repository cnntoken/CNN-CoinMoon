import * as types from './types';

export const report = (payload, callback) => {
    return {
        type: types.REPORT_RESOURCE,
        payload,
        callback
    };
};
