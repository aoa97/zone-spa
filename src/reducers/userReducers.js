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
    USER_GOOGLE_LOGIN_FAIL
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
