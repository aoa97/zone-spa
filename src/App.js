import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { listenUser } from './actions/userActions';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';

const App = ({ history }) => {
  // Listen to auth state
  const dispatch = useDispatch()
  const { success } = useSelector(state => state.userState)

  useEffect(() => {
    if (!success) {
      dispatch(listenUser())
    } else {
      history.push('/home')
    }
  }, [dispatch, history, success])

  return (
    <main>
      <Route path='/home' component={HomePage} />
      <Route exact path='/' component={LandingPage} />
    </main>
  );
}

export default withRouter(App);


