import {
    POST_CREATE_REQUEST,
    POST_CREATE_RESPONSE,
    POST_CREATE_FAIL,
    POST_LIST_REQUEST,
    POST_LIST_RESPONSE,
    POST_LIST_FAIL
} from '../constants/postConstants';
import { firestore, auth } from '../utils/firebase.utils';

const currentUid = auth.currentUser && auth.currentUser.uid

// Hanging
export const createPost = (post, comId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST })

        if (comId) {
            await firestore.collection('comPosts').add({
                createdAt: new Date(),
                comId,
                userId: auth.currentUser.uid,
                likeCount: 0,
                commentCount: 0,
                ...post
            })
        } else {
            await firestore.collection('userPosts').add({
                createdAt: new Date(),
                userId: auth.currentUser.uid,
                likeCount: 0,
                commentCount: 0,
                ...post
            })
        }

        dispatch({ type: POST_CREATE_RESPONSE })
    } catch (e) {
        dispatch({ type: POST_CREATE_FAIL, payload: e.message })
    }
}

export const getUserPosts = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        await firestore.collection('userPosts').where('userId', '==', userId).onSnapshot(snap => {
            dispatch({ type: POST_LIST_RESPONSE, payload: snap.docs })
        })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}

export const getComPosts = (comId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        await firestore.collection('comPosts').where('comId', '==', comId).onSnapshot(snap => {
            const posts = snap.docs.map(doc => {
                // const { userId } = doc.data()

                // const { avatar, displayName } = await (await firestore.collection('users').doc(userId).get()).data()

                return { ...doc.data() }
            })

            dispatch({ type: POST_LIST_RESPONSE, payload: posts })
        })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}

export const getAllComsPosts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        const coms = await firestore.collection('communities').where('members', 'array-contains', currentUid).get()

        // coms.docs.forEach(async doc => {
        //     await firestore.collection('comPosts').where('comId', '==', doc.id).onSnapshot(postsSnap => {
        //         // const posts = postsSnap.docs.map(post => post.data())

        //         dispatch({ type: POST_LIST_RESPONSE, payload: postsSnap.docs })
        //     })
        // })
        dispatch({ type: POST_LIST_RESPONSE, payload: [] })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}
