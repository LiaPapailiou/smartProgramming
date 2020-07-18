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
  }, [getClientProfile, clientId]);

  const formatXAxis = (tickItem) => {
    return moment(tickItem).format('DD / MMM / YY');
  };

  const formatColour = (value, entry) => {
    const { color } = entry;
    return <span style={ { color, fontSize: 14, paddingRight: '0.25em' } }>{ value }</span>;
  };
  return (
    <LineChart
      width={ 550 }
      height={ 300 }
      data={ clientProfile.clientOneRM.reverse() }
      margin={ {
        top: 5, right: 15, left: 5, bottom: 5,
      } }
      className="rm-chart"
    >
      <CartesianGrid vertical={ false } strokeDasharray="3 3" />
      <XAxis dataKey="added" tickFormatter={ formatXAxis } tick={ { fontSize: 12, fill: '#fff' } } />
      <YAxis unit=" kg" tick={ { fontSize: 12, fill: '#fff' } } />
      <Tooltip labelFormatter={ (t) => new Date(t).toLocaleString() } />
      <Legend formatter={ formatColour } />
      <Line type="monotone" dataKey="benchPress" name="Bench Press" stroke="#8884d8" activeDot={ { r: 8 } } />
      <Line type="monotone" dataKey="squat" name="Squat" stroke="#82ca9d" />
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