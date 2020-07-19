import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AddClient from './components/clients/AddClient';
import EditClientProfile from './components/clients/EditClientProfile';
import AddNewRM from './components/clients/AddNewRM';
import Client from './components/clients/Client';
import ShowAllExercises from './components/exercises/ShowAllExercises';
import AddExercise from './components/exercises/AddExercise';
import EditExercise from './components/exercises/EditExercise';
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
          <Route exact path='/exercises' component={ ShowAllExercises } />
          <Route exact path='/edit-exercise/:id' component={ EditExercise } />
          <Route exact path='/add-exercise' component={ AddExercise } />
          <section className="app-container">
            <Switch>
              <Route exact path='/register' component={ Register } />
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              <PrivateRoute exact path='/client/:id' component={ Client } />
              <PrivateRoute exact path='/add' component={ AddClient } />
              <PrivateRoute exact path='/add-rm/:id' component={ AddNewRM } />
              <PrivateRoute exact path='/edit/:id' component={ EditClientProfile } />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};




export default App;
