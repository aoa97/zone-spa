import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

import { listenUser } from './actions/userActions';
import { HomePage, LandingPage, ProfilePage, CommunityListPage, CommunityPage, FriendsPage } from './pages';

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
            <Route path='/profile' component={ProfilePage} />
            <Route path='/friends' component={FriendsPage} />
            <Route path='/communities/:id' component={CommunityPage} />
            <Route exact path='/communities' component={CommunityListPage} />
            <Route exact path='/home' component={HomePage} />
          </>
        )}
    </>
  )
}
export default withRouter(App);


