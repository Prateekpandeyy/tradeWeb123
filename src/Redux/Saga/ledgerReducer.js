import { call, put, select, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import api from "../../component/api";
import { ActionTypes } from "../constants/actionTypes";
const ledgerDetails = function* userLoginSuccess({payload}) {
    console.log("payload", payload)
    try {
        const {data, status} = yield call(api.ledgerData, payload)
        console.log("DAtq", data)
    }
    catch (err) {}
}
export default function* sagas() {
    yield takeLatest(ActionTypes.FETCH_LEDGER_DETAILS, ledgerDetails);
}