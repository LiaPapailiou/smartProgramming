import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
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
            <section className="app-container">
              <Route component={ Dashboard } />
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};


export default App;
