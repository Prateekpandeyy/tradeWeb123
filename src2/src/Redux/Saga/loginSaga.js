import { call, put, select, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import api from "../../component/api";
import {browserHistory} from 'react-router'
import {useNavigate} from 'react-router-dom'
import {push} from 'connected-react-router';
import { setLoginDetails, setOtpBoxOpen, setToken, setTokenExpireTime } from "../actions/action";
import { ActionTypes } from "../constants/actionTypes";

const userDataRequest = function* userDataRequest({ payload }) {
 
  try {
    const { data, status } = yield call(api.getUserDetailsOnLogin, payload);
    yield put(setLoginDetails(data[0]));
    if (status === 200) {
      let phoneno = data[0].Mobile;
      let datamobile = {
        phoneno: "91" + phoneno,
      };
      const val = yield call(api.sendOtp, datamobile);
      if (val?.data?.type === "success") {
        yield put(setOtpBoxOpen(true));
      }
    } else {
      Swal.fire({
        title: "error",
        html: "Incorrect user id",
        icon: "error",
      });
    }
  } catch (err) {}
};

const resendOtpRequest = function* resendOtpRequest({payload}) {
 try {
   const {data, status} = yield call(api.resendOtp, payload);
   if(status === 200) {
    Swal.fire({
      title: "success",
      html: "An Otp sent to registered mobile number",
      icon: "success",
    });
   }
 }
 catch (err) {}
}
const userLoginSuccess = function* userLoginSuccess({payload}) {

  try {
    const {data, status} = yield call(api.loginSuccess, payload[0])
    if(status === 200 || data.type === "error"){
      const val = yield call(api.validatePassword, payload[1]);
      
      if (val?.data.message === "success") {
       
        yield put(setToken(val.data.token))
        yield put(setTokenExpireTime(val.data.tokenExpireTime))
      }
      // localStorage.setItem("userName", a[0].ClientName);
                localStorage.setItem("token", val.data.token);
                localStorage.setItem("tokenExpireTime", val.data.tokenExpireTime)
      Swal.fire({
        title : "success",
        html : "Login successfully",
        icon : "success"
      })
      yield put(push('/wallets'));
    }
  }
  catch (err) {}
}
export default function* sagas() {
  yield takeLatest(ActionTypes.FETCH_USER_DETAILS, userDataRequest);
  yield takeLatest(ActionTypes.RESEND_OTP, resendOtpRequest)
  yield takeLatest(ActionTypes.LOGIN_SUCCESS, userLoginSuccess)
}
