import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

import { listenUser } from './actions/userActions';
import { HomePage, LandingPage, ProfilePage, CommunityListPage, CommunityPage } from './pages';

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
            <Route exact path='/communities' component={CommunityListPage} />
            <Route path='/communities/:id' component={CommunityPage} />
          </>
        )}
    </>
  )
}
export default withRouter(App);


