import {
    POST_CREATE_REQUEST,
    POST_CREATE_RESPONSE,
    POST_CREATE_FAIL
} from '../constants/postConstants';
import { firestore } from '../utils/firebase.utils';

export const createPost = (post) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST })

        // firestore.

        dispatch({ type: POST_CREATE_RESPONSE })
    } catch (e) {
        dispatch({ type: POST_CREATE_FAIL, payload: e.message })
    }
}