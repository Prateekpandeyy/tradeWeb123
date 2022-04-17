import { takeEvery, all, fork } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import ledgerReducer from "./ledgerReducer";
function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {});
}

export default function* root(){
    yield all([
      fork(watchAndLog),
      fork(loginSaga),
      fork(ledgerReducer)
    ])
};