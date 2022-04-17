import {combineReducers} from "redux";
import { connectRouter } from "connected-react-router";
import {LoginReducer} from "../reducers/loginReducer";
const createRootReducer =(history)=> 
combineReducers({
   LoginReducer:  LoginReducer,
    router : connectRouter(history)
})

export default createRootReducer;