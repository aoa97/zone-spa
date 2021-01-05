import { auth, signInWithGoogle, createUserProfileDocument, updateUserProfileDocument } from '../utils/firebase.utils';
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
} from "../constants/userConstants"

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

        dispatch({ type: USER_UPDATE_FAIL, payload: message })
    }
}