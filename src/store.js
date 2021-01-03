import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userRegisterReducer, userStateReducer, userLoginReducer, userGoogleLoginReducer, userUpdateReducer } from './reducers/userReducers';
import { postCreateReducer } from './reducers/postReducers';

const reducers = combineReducers({
    // User
    userState: userStateReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userGoogleLogin: userGoogleLoginReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    // Post
    postCreate: postCreateReducer
})

const initialState = {

}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store