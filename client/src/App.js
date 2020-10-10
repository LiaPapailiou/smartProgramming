import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from '../src/components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import { loadUser, refresh } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    // if (!localStorage.token) {
    //   store.dispatch(refresh(localStorage.userEmail, localStorage.refreshToken));
    // }
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={ store }>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={ Landing } />
            <Route exact path='/register' component={ Register } />
            <>
              <PrivateRoute component={ Dashboard } />
            </>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};


export default App;
