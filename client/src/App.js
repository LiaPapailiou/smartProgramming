import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import './App.css';

const App = () =>
  <Router>
    <Fragment>
      <Route exact path='/' component={ Landing } />
      <section className="app-container">
        <Switch>
          {/* <Navbar /> */ }
          <Route exact path='/register' component={ Register } />
        </Switch>

      </section>
    </Fragment>
  </Router>;



export default App;
