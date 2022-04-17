import {ActionTypes} from "../constants/actionTypes";

const initialState = {
    AuthDetails:{},
    setOtpBoxOpen:false,
    tokenKey : "",
    expireTokenTime : ""
}

export const LoginReducer = (state= initialState, {type,payload})=>{
   
    switch(type) {
        case ActionTypes.SET_TOKEN_EXPIRETIME:
            return {
                ...state,
                expireTokenTime : payload
            }
        case ActionTypes.SET_LOGIN_DETAILS:
            return {
                ...state,
                AuthDetails:{
                    ...payload
                }
            }
        case ActionTypes.SET_OTP_BOX_OPEN:
            return{
                ...state,
                setOtpBoxOpen:payload
            }
            case ActionTypes.SET_TOKEN: 
            return {
                ...state,
                tokenKey : payload
            }
        default:
            return state;
    }
}