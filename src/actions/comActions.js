import {
    COM_CREATE_REQUEST,
    COM_CREATE_RESPONSE,
    COM_CREATE_FAIL,
    COM_LIST_REQUEST,
    COM_LIST_RESPONSE,
    COM_LIST_FAIL
} from '../constants/comConstants'
import { auth, firestore } from '../utils/firebase.utils'

const currentUid = auth.currentUser && auth.currentUser.uid

export const createCom = (com) => async (dispatch, getState) => {
    try {
        dispatch({ type: COM_CREATE_REQUEST })

        await firestore.collection('communities').add({
            createdAt: new Date(),
            createdBy: currentUid,
            image: com.image ? com.image : 'http://placehold.it/100',
            members: new Array(currentUid),
            ...com
        })

        dispatch({ type: COM_CREATE_RESPONSE })
    } catch (e) {
        dispatch({ type: COM_CREATE_FAIL, payload: "Error creating a community" })
    }
}

export const getComs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COM_LIST_REQUEST })

        await firestore.collection('communities').onSnapshot(snap => {
            const coms = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            dispatch({ type: COM_LIST_RESPONSE, payload: coms })
        })
    } catch (e) {
        dispatch({ type: COM_LIST_FAIL, payload: e.message })
    }
}