import React, { useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getClientProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const OneRMChart = ({ clientId, getClientProfile, profile: { clientProfile } }) => {
  useEffect(() => {
    getClientProfile(clientId);
  }, [getClientProfile]);

  const formatXAxis = (tickItem) => {
    return moment(tickItem).format('YY/MM/dd');
  };
  return (
    <LineChart
      width={ 500 }
      height={ 300 }
      data={ clientProfile.clientOneRM.reverse() }
      margin={ {
        top: 5, right: 30, left: 20, bottom: 5,
      } }
    >
      <CartesianGrid vertical={ false } strokeDasharray="3 3" />
      <XAxis dataKey="added" tickFormatter={ formatXAxis } />
      <YAxis unit=" kg" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="benchPress" stroke="#8884d8" activeDot={ { r: 8 } } color="#fff" />
      <Line type="monotone" dataKey="squat" stroke="#82ca9d" />
    </LineChart>
  );
};
OneRMChart.propTypes = {
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile })(OneRMChart);