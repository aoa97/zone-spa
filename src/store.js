import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { postCreateReducer, postDeleteReducer, postListReducer } from './reducers/postReducers';
import { comCreateReducer, comListReducer, comDetailsReducer } from './reducers/comReducers';
import {
    userRegisterReducer,
    userStateReducer,
    userLoginReducer,
    userGoogleLoginReducer,
    userUpdateReducer,
    userListReducer,
    userAddFriendReducer,
    userRequestListReducer,
    userRequestDeleteReducer,
    userRequestConfirmReducer
} from './reducers/userReducers';

const reducers = combineReducers({
    // User
    userState: userStateReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userGoogleLogin: userGoogleLoginReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userAddFriend: userAddFriendReducer,
    userRequestList: userRequestListReducer,
    userRequestDelete: userRequestDeleteReducer,
    userRequestConfirm: userRequestConfirmReducer,
    // Post
    postCreate: postCreateReducer,
    postList: postListReducer,
    postDelete: postDeleteReducer,
    // Community
    comCreate: comCreateReducer,
    comList: comListReducer,
    comDetails: comDetailsReducer
})

const initialState = {

}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store