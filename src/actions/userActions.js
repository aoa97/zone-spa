import { auth, firestore, signInWithGoogle, createUserProfileDocument, updateUserProfileDocument, timestamp } from '../utils/firebase.utils';
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
    USER_REQUEST_DELETE_FAIL
} from "../constants/userConstants"
import { storage } from '../utils/firebase.utils';


export const listenUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_STATE_REQUEST })

        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snap => {
                    dispatch({
                        type: USER_STATE_RESPONSE,
                        payload: { id: snap.id, ...snap.data() }
                    })
                })
            } else {
                dispatch({
                    type: USER_STATE_RESET,
                    payload: userAuth
                })
            }
        })
    } catch (e) {
        dispatch({ type: USER_STATE_FAIL, payload: e.message })
    }
}

export const registerUser = (displayName, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const userAuth = await auth.createUserWithEmailAndPassword(email, password)
        await userAuth.user.updateProfile({ displayName })
        await userAuth.user.sendEmailVerification()

        dispatch({ type: USER_REGISTER_RESPONSE })
    } catch (e) {
        let message = ''

        switch (e.code) {
            case 'auth/invalid-email':
                message = email.length > 0 && "Please enter a valid email address."
                break
            case 'auth/email-already-in-use':
                message = "The email address is already in use."
                break
            case 'auth/network-request-failed':
                message = "Network error, please check your connection."
                break
            default:
                message = e.message
        }

        dispatch({ type: USER_REGISTER_FAIL, payload: message })
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        await auth.signInWithEmailAndPassword(email, password)

        dispatch({ type: USER_LOGIN_RESPONSE })
    } catch (e) {
        let message = ''

        switch (e.code) {
            case 'auth/invalid-email':
                message = email.length > 0 && "Please enter a valid email address."
                break
            case 'auth/wrong-password':
                message = password.length > 0 && "The password that you've entered is incorrect."
                break
            case 'auth/user-not-found':
                message = "This email is not associated with any Zone account."
                break
            case 'auth/network-request-failed':
                message = "Network error, please check your connection."
                break
            default:
                message = e.message
        }

        dispatch({ type: USER_LOGIN_FAIL, payload: message })
    }
}

export const loginWithGoogle = () => (dispatch) => {
    try {
        dispatch({ type: USER_GOOGLE_LOGIN_REQUEST })

        signInWithGoogle()

        dispatch({ type: USER_GOOGLE_LOGIN_RESPONSE })
    } catch (e) {
        dispatch({ type: USER_GOOGLE_LOGIN_FAIL, payload: e.message })
    }
}

export const updateUser = (newUser) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        if (newUser.email) {
            await auth.currentUser.updateEmail(newUser.email)
        }

        await updateUserProfileDocument(newUser)

        dispatch({ type: USER_UPDATE_RESPONSE })
    } catch (e) {
        let message = ''

        switch (e.code) {
            case 'auth/invalid-email':
                message = newUser.email.length > 0 && "Please enter a valid email address."
                break
            case 'auth/email-already-in-use':
                message = "The email address is already in use."
                break
            case 'auth/network-request-failed':
                message = "Network error, please check your connection."
                break
            default:
                message = e.message
        }

        dispatch({ type: USER_UPDATE_FAIL, payload: message })
    }
}

export const updateUserAvatar = (image) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const storageRef = storage.ref(`/images/users/avatars/${image.name}`)

        storageRef.put(image).on('state_changed', () => {
            console.log("Upload image state")
        }, (e) => {
            throw new Error(e)
        }, async () => {
            const url = await storageRef.getDownloadURL()

            await auth.currentUser.updateProfile({ photoURL: url })

            await updateUserProfileDocument({ avatar: url })
        })

        dispatch({ type: USER_UPDATE_RESPONSE })
    } catch (e) {
        let message = ''

        switch (e.code) {
            case 'auth/network-request-failed':
                message = "Network error, please check your connection."
                break
            default:
                message = e.message
        }

        dispatch({ type: USER_UPDATE_FAIL, payload: message })
    }
}

export const getUsers = (query) => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        await firestore.collection('users').where('email', '!=', auth.currentUser.email).onSnapshot(snap => {
            const users = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            dispatch({ type: USER_LIST_RESPONSE, payload: users })
        })
    } catch (e) {
        dispatch({ type: USER_LIST_FAIL, payload: e.message })
    }
}

export const sendFriendRequest = (uid) => async (dispatch) => {
    try {
        dispatch({ type: USER_ADD_FRIEND_REQUEST })

        await firestore.collection('users').doc(uid).collection('friendRequests').add({
            userId: auth.currentUser.uid,
            sentAt: timestamp()
        })

        dispatch({ type: USER_ADD_FRIEND_RESPONSE })
    } catch (e) {
        dispatch({ type: USER_ADD_FRIEND_FAIL, payload: e.message })
    }
}

export const getFriendRequests = () => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST_LIST_REQUEST })

        const snap = await firestore.collection('users').doc(auth.currentUser.uid).collection('friendRequests').get()

        const users = []
        for (const doc of snap.docs) {
            const { userId } = doc.data()
            const userSnap = await firestore.collection('users').doc(userId).get()
            const { displayName, avatar, status } = userSnap.data()
            users.push({
                id: doc.id,
                uid: userSnap.id,
                displayName,
                avatar,
                status
            })
        }

        dispatch({ type: USER_REQUEST_LIST_RESPONSE, payload: users })
    } catch (e) {
        dispatch({ type: USER_REQUEST_LIST_FAIL, payload: e.message })
    }
}

export const deleteFriendRequest = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST_DELETE_REQUEST })

        // Delete request
        await firestore.collection('users').doc(auth.currentUser.uid).collection('friendRequests').doc(id).delete()

        dispatch({ type: USER_REQUEST_DELETE_RESPONSE })
    } catch (e) {
        dispatch({ type: USER_REQUEST_DELETE_FAIL, payload: e.message })
    }
}

export const confirmFriendRequest = (reqId, userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST_DELETE_REQUEST })

        // Add friendship
        await firestore.collection('friendships').add({
            userA: auth.currentUser.uid,
            userB: userId,
            since: timestamp()
        })

        // Delete request
        await firestore.collection('users').doc(auth.currentUser.uid).collection('friendRequests').doc(reqId).delete()

        dispatch({ type: USER_REQUEST_DELETE_RESPONSE })
    } catch (e) {
        dispatch({ type: USER_REQUEST_DELETE_FAIL, payload: e.message })
    }
}