/**
 *  Redux saga class init
 */
import {takeEvery, all, take} from 'redux-saga/effects';
import * as types from '../actions/types';
// import appSaga from './appSaga';
import * as authSaga from './authSaga';
import * as disCloseSaga from './disCloseSaga';
import * as feedSaga from './feedSaga';
import * as userActionSaga from './userActionSaga';
import * as reportSaga from './reportSaga';

export default function* watch() {
    yield all([

        // Auth
        takeEvery(types.AUTH_LOGIN, authSaga.login),
        takeEvery(types.AUTH_REGISTER, authSaga.register),
        takeEvery(types.AUTH_VERIFY, authSaga.verify),
        takeEvery(types.AUTH_RESEND, authSaga.resend),
        takeEvery(types.AUTH_LOGOUT, authSaga.logout),
        takeEvery(types.AUTH_REFRESH, authSaga.refresh),


        /////////////////// 爆料
        takeEvery(types.DISCLOSE_PUBLISH, disCloseSaga.publish),
        takeEvery(types.DISCLOSE_UPLOAD, disCloseSaga.upload),
        takeEvery(types.DISCLOSE_GETLIST, disCloseSaga.getList),
        takeEvery(types.DISCLOSE_LIKE, disCloseSaga.like),
        takeEvery(types.DISCLOSE_DELETEDISCLOSE, disCloseSaga.deleteDisclose),
        takeEvery(types.DISCLOSE_GETDISCLOSEDETAIL, disCloseSaga.getDiscloseDetail),
        takeEvery(types.DISCLOSE_GETDISCLOSECOMMENTS, disCloseSaga.getDiscloseComments),
        takeEvery(types.DISCLOSE_COMMENTDISCLOSE, disCloseSaga.commentDisclose),
        takeEvery(types.DISCLOSE_LIKECOMMENT, disCloseSaga.likeComment),
        takeEvery(types.DISCLOSE_DELETECOMMENT, disCloseSaga.deleteComment),
        takeEvery(types.DISCLOSE_GETLISTBYUSERID, disCloseSaga.getListByUserId),

        /////////////////// 资讯
        takeEvery(types.FEED_GETLIST, feedSaga.getList),
        takeEvery(types.FEED_GETDETAIL, feedSaga.getDetail),
        takeEvery(types.FEED_GETCOMMENTLIST, feedSaga.getCommentList),
        takeEvery(types.FEED_LIKE, feedSaga.like),
        takeEvery(types.FEED_COMMENT, feedSaga.comment),
        takeEvery(types.FEED_LIKE_COMMENT, feedSaga.likeComment),
        takeEvery(types.FEED_DELETE_COMMENT, feedSaga.deleteComment),
        takeEvery(types.FEED_LIST_BYUSERID, feedSaga.getListByUserId),


        // 用户行为
        takeEvery(types.USERACTION_GETACTION, userActionSaga.getActions),
        takeEvery(types.USERACTION_UPDATE, userActionSaga.update),

        // 举报
        takeEvery(types.REPORT_RESOURCE, reportSaga.report)

    ]);
}
