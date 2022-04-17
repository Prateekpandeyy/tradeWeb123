import {ActionTypes} from "../constants/actionTypes";

export const setLoginDetails = (payload)=>{
    return {
        type: ActionTypes.SET_LOGIN_DETAILS,
        payload:payload
    };
}

export const fetchUserDetails = (payload)=>{
    return {
        type: ActionTypes.FETCH_USER_DETAILS,
        payload:payload
    }
}

export const setOtpBoxOpen = (payload) =>{
    
    return {
        type: ActionTypes.SET_OTP_BOX_OPEN,
        payload:payload
    }
}
export const resendOtp = (payload) =>{
    
    return {
        type: ActionTypes.RESEND_OTP,
        payload:payload
    }
}
export const loginSuccess = (payload) =>{
    
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload:payload
    }
}
export const setToken = (payload)=>{
    return {
        type: ActionTypes.SET_TOKEN,
        payload:payload
    };
}
export const setTokenExpireTime = (payload) => {
    return {
        type: ActionTypes.SET_TOKEN_EXPIRETIME,
        payload:payload
    };
}
export const fetchLedgerDetails = (payload) => {
    return {
        type : ActionTypes.FETCH_LEDGER_DETAILS,
        payload: payload
    }
}

