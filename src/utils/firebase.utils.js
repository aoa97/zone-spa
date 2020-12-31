import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBad7nDEk8FJKicdMAc8id0hScZaSXlDzU",
    authDomain: "zone-2020.firebaseapp.com",
    projectId: "zone-2020",
    storageBucket: "zone-2020.appspot.com",
    messagingSenderId: "979810220686",
    appId: "1:979810220686:web:f445741150322fd319e7df",
    measurementId: "G-ZW78YMLJVJ"
}

firebase.initializeApp(config)
firebase.analytics();

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google Sign In
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// Create user profile document
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`/users/${userAuth.uid}`)
    const snap = await userRef.get()

    if (!snap.exists) {
        try {
            await userRef.set({
                displayName: userAuth.displayName,
                email: userAuth.email,
                avatar: userAuth.photoURL ? userAuth.photoURL : "http://placehold.it/150",
                phone: null,
                createdAt: new Date(),
                ...additionalData
            })
        } catch (e) {
            console.log("Error creating user", e.message)
        }
    }

    return userRef
}

