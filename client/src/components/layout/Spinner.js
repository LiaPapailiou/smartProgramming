import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={ spinner }
      style={ { width: '30px', margin: '500px', marginLeft: '900px', display: 'block' } }
      alt='Loading...'
    />
  </Fragment>
);