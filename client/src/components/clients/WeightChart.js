import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';


const WeightChart = ({ profile: { clientProfile } }) => {
  const formatXAxis = (tickItem) => {
    return moment(tickItem).format('DD / MMM / YY');
  };

  const formatColour = (value, entry) => {
    const { color } = entry;
    return <span style={ { color, fontSize: 14, paddingRight: '0.25em' } }>{ value }</span>;
  };
  const data = clientProfile.clientWeight;

  return (
    <LineChart
      width={ 450 }
      height={ 300 }
      data={ data }
      margin={ {
        top: 5, right: 15, left: 5, bottom: 5,
      } }
      className="weight-chart"
    >
      <CartesianGrid vertical={ false } strokeDasharray="3 3" />
      <XAxis dataKey="added" tickFormatter={ formatXAxis } tick={ { fontSize: 12, fill: '#fff' } } />
      <YAxis unit=" kg" tick={ { fontSize: 12, fill: '#fff' } } />
      <Tooltip labelFormatter={ (t) => new Date(t).toLocaleString() } />
      <Legend formatter={ formatColour } />
      <Line type="monotone" dataKey="weight" name="Weight" stroke="#b392ac" activeDot={ { r: 8 } } />
    </LineChart>
  );
};

WeightChart.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(WeightChart);
