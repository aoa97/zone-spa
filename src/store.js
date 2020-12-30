import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userRegisterReducer, userStateReducer, userLoginReducer, userGoogleLoginReducer } from './reducers/userReducers';

const reducers = combineReducers({
    // user
    userState: userStateReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userGoogleLogin: userGoogleLoginReducer,
})

const initialState = {

}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store