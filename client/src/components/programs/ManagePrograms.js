import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrograms } from '../../actions/programs';
import { getAllProfiles } from '../../actions/profile';
import ProgramItem from './ProgramItem';

const ManagePrograms = ({ programs: { programs }, getPrograms, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
    getPrograms();
  }, [getPrograms, getAllProfiles]);


  return (
    <div className="table-wrapper" style={ { width: '41vw', maxHeight: '80vh', backgroundColor: '#00000080', marginLeft: 450, } }>
      {
        programs &&
        <table className="program-container" style={ { color: '#fff', width: '40vw', borderCollapse: 'collapse', } }>
          <thead>
            <tr>
              <th>Program</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              programs.map((programItem) => (
                <ProgramItem key={ programItem._id } programItem={ programItem } />
              ))
            }
          </tbody>
        </table>
      }

    </div>
  );
};

ManagePrograms.propTypes = {
  programs: PropTypes.object.isRequired,
  getPrograms: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  programs: state.programs,
});
export default connect(mapStateToProps, { getPrograms, getAllProfiles })(ManagePrograms);
