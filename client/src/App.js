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
import ShowLibrary from './components/exerciseLibrary/ShowLibrary';
import AddExercise from './components/exercises/AddExercise';
import AddToLibrary from './components/exerciseLibrary/AddToLibrary';
import EditExercise from './components/exercises/EditExercise';
import EditLibrary from './components/exerciseLibrary/EditLibrary';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import './App.css';


// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={ store }>
      <Router>
        <Fragment>
          <Route exact path='/' component={ Landing } />
          <section className="app-container">
            <Switch>
              <PrivateRoute exact path='/register' component={ Register } />
              <PrivateRoute exact path='/exercise-library' component={ ShowLibrary } />
              <PrivateRoute exact path='/edit-library/:id' component={ EditLibrary } />
              <PrivateRoute exact path='/add-library/' component={ AddToLibrary } />
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              <PrivateRoute exact path='/client/:id' component={ Client } />
              <PrivateRoute exact path='/add' component={ AddClient } />
              <PrivateRoute exact path='/add-rm/:id' component={ AddNewRM } />
              <PrivateRoute exact path='/edit/:id' component={ EditClientProfile } />
              <PrivateRoute exact path='/exercises' component={ ShowAllExercises } />
              <PrivateRoute exact path='/add-exercise' component={ AddExercise } />
              <PrivateRoute exact path='/edit-exercise/:id' component={ EditExercise } />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};




export default App;
