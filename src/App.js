import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

import { listenUser } from './actions/userActions';
import { HomePage, LandingPage, ProfilePage, CommunitiesPage } from './pages';

const App = ({ history }) => {
  // Listen to auth state
  const dispatch = useDispatch()
  const { loading, success } = useSelector(state => state.userState)

  useEffect(() => {

    if (success) {
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
            <Route path='/communities' component={CommunitiesPage} />
          </>
        )}
    </>
  )
}
export default withRouter(App);


