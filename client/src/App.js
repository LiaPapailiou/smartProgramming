import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
// import Navbar from './components/layout/Navbar'
// import Alert from './components/layout/Alert'
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
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={ store }>
      <Router>
        <Fragment>
          <Route exact path='/' component={ Landing } />
          <section className="app-container">
            {/* <Alert /> */ }
            <Switch>
              {/* <Navbar /> */ }
              <Route exact path='/register' component={ Register } />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};




export default App;
