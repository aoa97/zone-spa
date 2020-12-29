import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'

import { auth, createUserProfileDocument } from './utils/firebase.utils';
import LandingPage from './pages/Landing/LandingPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsunscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snap => setCurrentUser({ id: snap.id, ...snap.data() }))
      } else { // Logout
        setCurrentUser(userAuth)
      }
    })

    return () => {
      // Unmount to prevent any memory leaks in the app
      unsunscribeFromAuth()
    }
  }, [])


  return (
    <main>
      <Route exact path='/' component={LandingPage} />
    </main>
  );
}

export default App;