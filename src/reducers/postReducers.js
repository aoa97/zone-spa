import {
    POST_CREATE_REQUEST,
    POST_CREATE_RESPONSE,
    POST_CREATE_FAIL
} from '../constants/postConstants';

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true }
        case POST_CREATE_RESPONSE:
            return { loading: false, success: true }
        case POST_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}