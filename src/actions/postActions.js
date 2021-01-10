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
import { firestore, timestamp, auth } from '../utils/firebase.utils';

// postCreate
export const createProfilePost = (post) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST })

        await firestore.collection('userPosts').add({
            createdAt: timestamp(),
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

export const createCommunityPost = (comId, post) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST })

        await firestore.collection('comPosts').add({
            createdAt: timestamp(),
            comId,
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

// postList
export const getProfilePosts = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        await firestore.collection('userPosts').where('userId', '==', userId).onSnapshot(async snap => {
            const postsAsync = snap.docs.map(async doc => {
                const { userId } = doc.data()

                const { avatar, displayName } = await (await firestore.collection('users').doc(userId).get()).data()

                return { id: doc.id, ...doc.data(), userAvatar: avatar, userName: displayName }
            })

            const posts = await Promise.all(postsAsync)

            dispatch({ type: POST_LIST_RESPONSE, payload: posts })
        })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}

export const getComPosts = (comId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        await firestore.collection('comPosts').where('comId', '==', comId).onSnapshot(async snap => {
            const postsAsync = snap.docs.map(async doc => {
                const { userId } = doc.data()

                const { avatar, displayName } = await (await firestore.collection('users').doc(userId).get()).data()
                const { name } = await (await firestore.collection('communities').doc(comId).get()).data()

                return { id: doc.id, ...doc.data(), userAvatar: avatar, userName: displayName, com: { id: comId, name } }
            })

            const posts = await Promise.all(postsAsync) // Takes array of promises & returns a single promise


            dispatch({ type: POST_LIST_RESPONSE, payload: posts })
        })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}

export const getAllComsPosts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })

        // Get coms of user
        const comsSnap = await firestore.collection('communities').where('members', 'array-contains', auth.currentUser.uid).get()

        // Get every com's posts
        const posts = []

        for (const doc of comsSnap.docs) {
            const postsSnap = await firestore.collection('comPosts').where('comId', '==', doc.id).get()

            for (const post of postsSnap.docs) {
                const { name } = doc.data() // Comm name
                const { userId } = post.data()

                const { avatar, displayName } = await (await firestore.collection('users').doc(userId).get()).data()

                posts.push({ id: post.id, ...post.data(), userAvatar: avatar, userName: displayName, com: { id: doc.id, name } })
            }
        }

        dispatch({ type: POST_LIST_RESPONSE, payload: posts })
    } catch (e) {
        dispatch({ type: POST_LIST_FAIL, payload: e.message })
    }
}

// postDelete
export const deleteProfilePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DELETE_REQUEST })

        await firestore.collection('userPosts').doc(id).delete()

        dispatch({ type: POST_DELETE_RESPONSE })
    } catch (e) {
        dispatch({ type: POST_DELETE_FAIL, payload: e.message })
    }
}

export const deleteComPost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DELETE_REQUEST })

        await firestore.collection('comPosts').doc(id).delete()

        dispatch({ type: POST_DELETE_RESPONSE })
    } catch (e) {
        dispatch({ type: POST_DELETE_FAIL, payload: e.message })
    }
}