/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {Alert} from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
// import * as loginActions from 'app/actions/loginActions';
import * as listActions from 'app/actions/listActions';

// Our worker Saga that logins the user
export default function* listAsync() {
    // yield put(loginActions.enableLoader());

    //how to call api
    //const response = yield call(loginUser, action.username, action.password);
    //mock response

    const pratik = require("../../assets/contacts/pratik.png");
    const sanket = require("../../assets/contacts/sanket.png");
    const megha = require("../../assets/contacts/megha.png");
    const atul = require("../../assets/contacts/atul.png");
    const saurabh = require("../../assets/contacts/saurabh.png");
    const varun = require("../../assets/contacts/varun.png");

    const datas = [
        {
            img: pratik,
            text: "Kumar Pratik",
            note: "Its time to build a difference . .",
            time: "3:43 pm"
        },
        {
            img: sanket,
            text: "Kumar Sanket",
            note: "One needs courage to be happy and smiling all time . . ",
            time: "1:12 pm"
        },
        {
            img: megha,
            text: "Megha",
            note: "Live a life style that matchs your vision",
            time: "10:03 am"
        },
        {
            img: atul,
            text: "Atul Ranjan",
            note: "Failure is temporary, giving up makes it permanent",
            time: "5:47 am"
        },
        {
            img: saurabh,
            text: "Saurabh Sahu",
            note: "The biggest risk is a missed opportunity !!",
            time: "11:11 pm"
        },
        {
            img: varun,
            text: "Varun Sahu",
            note: "Wish I had a Time machine . .",
            time: "8:54 pm"
        }
    ];


    const response = {success: true, data: datas};

    if (response.success) {
        yield put(listActions.onGetOK(response.data));
        // yield put(loginActions.disableLoader({}));
        // yield call(navigationActions.navigateToHome);
    } else {
        // yield put(loginActions.loginFailed());
        // yield put(loginActions.disableLoader({}));
        // setTimeout(() => {
        //     Alert.alert('BoilerPlate', response.Message);
        // }, 200);
    }
}
