import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const OneRMChart = ({ profile: { clientProfile } }) => {

  const formatXAxis = (tickItem) => {
    return moment(tickItem).format('DD / MMM / YY');
  };

  const formatColour = (value, entry) => {
    const { color } = entry;
    return <span style={ { color, fontSize: 14, paddingRight: '0.25em' } }>{ value }</span>;
  };
  const invertedData = [];
  for (let i = clientProfile.clientOneRM.length - 1;i >= 0;i -= 1) {
    invertedData.push(clientProfile.clientOneRM[i]);
  }
  return (
    <LineChart
      width={ 550 }
      height={ 300 }
      data={ invertedData }
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
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(OneRMChart);