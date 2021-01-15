import {
    USER_STATE_REQUEST,
    USER_STATE_RESPONSE,
    USER_STATE_FAIL,
    USER_STATE_RESET,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESPONSE,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESPONSE,
    USER_LOGIN_FAIL,
    USER_GOOGLE_LOGIN_REQUEST,
    USER_GOOGLE_LOGIN_RESPONSE,
    USER_GOOGLE_LOGIN_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESPONSE,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_RESPONSE,
    USER_LIST_FAIL,
    USER_ADD_FRIEND_REQUEST,
    USER_ADD_FRIEND_RESPONSE,
    USER_ADD_FRIEND_FAIL,
    USER_REQUEST_LIST_REQUEST,
    USER_REQUEST_LIST_RESPONSE,
    USER_REQUEST_LIST_FAIL,
    USER_REQUEST_DELETE_REQUEST,
    USER_REQUEST_DELETE_RESPONSE,
    USER_REQUEST_DELETE_FAIL,
    USER_REQUEST_CONFIRM_REQUEST,
    USER_REQUEST_CONFIRM_RESPONSE,
    USER_REQUEST_CONFIRM_FAIL
} from '../constants/userConstants';

export const userStateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_STATE_REQUEST:
            return { loading: true, user: {} }
        case USER_STATE_RESPONSE:
            return { loading: false, success: true, user: action.payload }
        case USER_STATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_STATE_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_RESPONSE:
            return { loading: false, success: true }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_RESPONSE:
            return { loading: false, success: true }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userGoogleLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GOOGLE_LOGIN_REQUEST:
            return { loading: true }
        case USER_GOOGLE_LOGIN_RESPONSE:
            return { loading: false, success: true }
        case USER_GOOGLE_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_RESPONSE:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true, users: [] }
        case USER_LIST_RESPONSE:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAddFriendReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_FRIEND_REQUEST:
            return { loading: true }
        case USER_ADD_FRIEND_RESPONSE:
            return { loading: false, success: true }
        case USER_ADD_FRIEND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRequestListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case USER_REQUEST_LIST_REQUEST:
            return { loading: true, requests: [] }
        case USER_REQUEST_LIST_RESPONSE:
            return { loading: false, requests: action.payload }
        case USER_REQUEST_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRequestDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REQUEST_DELETE_REQUEST:
            return { loading: true }
        case USER_REQUEST_DELETE_RESPONSE:
            return { loading: false, success: true }
        case USER_REQUEST_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRequestConfirmReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REQUEST_CONFIRM_REQUEST:
            return { loading: true }
        case USER_REQUEST_CONFIRM_RESPONSE:
            return { loading: false, success: true }
        case USER_REQUEST_CONFIRM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}