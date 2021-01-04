import {
    POST_CREATE_REQUEST,
    POST_CREATE_RESPONSE,
    POST_CREATE_FAIL,
    POST_LIST_REQUEST,
    POST_LIST_RESPONSE,
    POST_LIST_FAIL
} from '../constants/postConstants';
import { firestore, auth } from '../utils/firebase.utils';

// Hanging
export const createPost = (post) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST })

        await firestore.collection('userPosts').add({
            createdAt: new Date(),
            userId: auth.currentUser.uid,
            likeCount: 0,
            commentCount: 0,
            ...post
        })

        dispatch({ type: POST_CREATE_RESPONSE })
    } catch (e) {
        dispatch({ type: POST_CREATE_FAIL, payload: e.message })
    }
}

export const getPosts = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        await firestore.collection('userPosts').where('userId', '==', userId).onSnapshot(snap => {
            dispatch({ type: POST_LIST_RESPONSE, payload: snap.docs })
        })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}
