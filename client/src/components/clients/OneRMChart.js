import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const OneRMChart = ({ profile: { clientProfile } }) => {
  const [selected, setSelected] = useState({ type: 'true' });

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
  const invertedWeightData = [];
  for (let i = clientProfile.clientWeight.length - 1;i >= 0;i -= 1) {
    invertedWeightData.push(clientProfile.clientWeight[i]);
  }

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "true" || value === "false")
      JSON.parse(value);
    setSelected({ ...selected, [e.target.name]: value });
  };
  return (
    <div className="charts">
      <label>
        <select type="text" name="type" onChange={ (e) => onChange(e) } style={ { color: '#000', fontSize: 14, padding: '0.15em', borderRadius: '0.3em', position: 'absolute', marginTop: 185, marginLeft: 460, zIndex: 1 } }>
          <option value="true">One RM</option>
          <option value="false">Weight</option>
        </select>
      </label>
      { selected.type === "true" && (

        <LineChart
          width={ 450 }
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
      ) }
      {
        selected.type === "false" &&
        (<LineChart
          width={ 450 }
          height={ 300 }
          data={ invertedWeightData }
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
          <Line type="monotone" dataKey="weight" name="Weight" stroke="#b392ac" activeDot={ { r: 8 } } />
        </LineChart>)
      }

    </div>
  );
};
OneRMChart.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(OneRMChart);