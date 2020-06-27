import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
// import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () =>
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
  </Provider>;




export default App;
