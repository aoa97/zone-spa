import {
    COM_CREATE_REQUEST,
    COM_CREATE_RESPONSE,
    COM_CREATE_FAIL,
    COM_LIST_REQUEST,
    COM_LIST_RESPONSE,
    COM_LIST_FAIL,
    COM_DETAILS_REQUEST,
    COM_DETAILS_RESPONSE,
    COM_DETAILS_FAIL
} from '../constants/comConstants'

export const comCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case COM_CREATE_REQUEST:
            return { loading: true }
        case COM_CREATE_RESPONSE:
            return { loading: false, success: true }
        case COM_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const comListReducer = (state = { coms: [] }, action) => {
    switch (action.type) {
        case COM_LIST_REQUEST:
            return { loading: true, coms: [] }
        case COM_LIST_RESPONSE:
            return { loading: false, coms: action.payload }
        case COM_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const comDetailsReducer = (state = { com: {} }, action) => {
    switch (action.type) {
        case COM_DETAILS_REQUEST:
            return { loading: true, com: {} }
        case COM_DETAILS_RESPONSE:
            return { loading: false, com: action.payload }
        case COM_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}