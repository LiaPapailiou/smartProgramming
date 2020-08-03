import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientPrograms } from '../../actions/profile';

const ClientPrograms = ({ clientId, profile: { programs } }) => {
  useEffect(() => {
    getClientPrograms(clientId);
  }, [getClientPrograms]);
  return (
    <div>
      <p>
        { programs.map((prgrm) =>
          console.log(prgrm)
        ) }

      </p>
    </div>
  );
};

ClientPrograms.propTypes = {
  getClientPrograms: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getClientPrograms })(ClientPrograms);
