import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

import { listenUser } from './actions/userActions';
import { HomePage, LandingPage, ProfilePage } from './pages';
import { auth } from './utils/firebase.utils';

const App = ({ history }) => {
  // Listen to auth state
  const dispatch = useDispatch()
  const { loading, success } = useSelector(state => state.userState)

  useEffect(() => {

    if (success) {
      auth.currentUser.updateProfile({ photoURL: 'https://scontent.fcai1-2.fna.fbcdn.net/v/t1.0-9/74680652_2613802782010966_4321296407597154304_o.jpg?_nc_cat=110&ccb=2&_nc_sid=174925&_nc_eui2=AeHJOe3tTv7rKk8dX0DeApnvoSPzKFJxWmChI_MoUnFaYCas32RcsK9JsDykLDfhlQy2AkdlQKdTfzmaZRVlrUmc&_nc_ohc=Y71B_KqzSrwAX9lCsIE&_nc_ht=scontent.fcai1-2.fna&oh=10fc581b8fbdd7b289b99352e74f7e33&oe=601312E2' })
      history.push('/home')
    } else {
      dispatch(listenUser())
      history.push('/')
    }
  }, [dispatch, history, success])

  return (
    <>
      <Route exact path='/' component={LandingPage} />

      {loading ? (
        <Dimmer active inverted style={{ backgroundColor: "#FFF" }}>
          <Loader inline='centered' />
        </Dimmer>
      ) : (
          <>
            <Route path='/home' component={HomePage} />
            <Route path='/profile' component={ProfilePage} />
          </>
        )}
    </>
  )
}
export default withRouter(App);


