import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    <>
      {
        programs.length !== 0 ? (
          <div className="table-wrapper" style={ { width: '41vw', maxHeight: '80vh', backgroundColor: '#00000080', marginLeft: 450, } }>

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
          </div>
        ) : (<p style={ { color: '#fff', fontSize: 22, marginLeft: 500 } }>There are currently no programs. Click <Link to="/dashboard/create">here</Link> to add one!</p>)
      }

    </>
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
