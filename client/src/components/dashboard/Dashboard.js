import React from 'react';
import ShowAllClients from '../clients/ShowAllClients';
import Sidebar from '../layout/Sidebar';
import {
  withRouter,
  Switch,
} from 'react-router-dom';
import AddClient from '../clients/AddClient';
import EditClientProfile from '../clients/EditClientProfile';
import AddNewRM from '../clients/AddNewRM';
import AddWeight from '../clients/AddWeight';
import Client from '../clients/Client';
import ShowAllExercises from '../exercises/ShowAllExercises';
import ShowLibrary from '../exerciseLibrary/ShowLibrary';
import AddExercise from '../exercises/AddExercise';
import AddToLibrary from '../exerciseLibrary/AddToLibrary';
import EditExercise from '../exercises/EditExercise';
import EditLibrary from '../exerciseLibrary/EditLibrary';
import CreatePrograms from '../programs/CreatePrograms';
import PrivateRoute from '../routing/PrivateRoute';
import ClientPrograms from '../clients/ClientPrograms';

const Dashboard = () => {

  return (
    <section className="dashboard">
      <div className="dark-overlay">
        <Sidebar />
        <Switch>
          <PrivateRoute exact path='/dashboard/exercise-library' component={ ShowLibrary } />
          <PrivateRoute exact path='/dashboard/edit-library/:id' component={ EditLibrary } />
          <PrivateRoute exact path='/dashboard/add-library' component={ AddToLibrary } />
          <PrivateRoute exact path='/dashboard/clients' component={ ShowAllClients } />
          <PrivateRoute exact path='/dashboard/client/:id' component={ Client } />
          <PrivateRoute exact path='/dashboard/add' component={ AddClient } />
          <PrivateRoute exact path='/dashboard/add-rm/:id' component={ AddNewRM } />
          <PrivateRoute exact path='/dashboard/add-weight/:id' component={ AddWeight } />
          <PrivateRoute exact path='/dashboard/get-programs' component={ ClientPrograms } />
          <PrivateRoute exact path='/dashboard/edit/:id' component={ EditClientProfile } />
          <PrivateRoute exact path='/dashboard/exercises' component={ ShowAllExercises } />
          <PrivateRoute exact path='/dashboard/add-exercise' component={ AddExercise } />
          <PrivateRoute exact path='/dashboard/edit-exercise/:id' component={ EditExercise } />
          <PrivateRoute exact path='/dashboard/create' component={ CreatePrograms } />
          {/* <PrivateRoute exact path='/dashboard/select/:program_short_id' component={ SelectExercises } /> */ }
        </Switch>
      </div>
    </section>

  );
};



export default withRouter(Dashboard);
