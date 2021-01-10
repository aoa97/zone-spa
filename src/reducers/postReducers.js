import {
    POST_CREATE_REQUEST,
    POST_CREATE_RESPONSE,
    POST_CREATE_FAIL,
    POST_LIST_REQUEST,
    POST_LIST_RESPONSE,
    POST_LIST_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_RESPONSE,
    POST_DELETE_FAIL
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

export const postListReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return { ...state, loading: true, posts: [] }
        case POST_LIST_RESPONSE:
            return { loading: false, posts: action.payload }
        case POST_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_DELETE_REQUEST:
            return { loading: true }
        case POST_DELETE_RESPONSE:
            return { loading: false, success: true }
        case POST_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}