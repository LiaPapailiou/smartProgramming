import React from 'react';
import {
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const VolumeChart = (props) => {
  const { volumeChart } = props;

  const formatColour = (value, entry) => {
    const { color } = entry;
    return <span style={ { color, fontSize: 14, paddingRight: '0.25em' } }>{ value }</span>;
  };
  return (
    <>
      <div style={ { marginTop: -600, marginLeft: 800 } }>
        <BarChart width={ 750 } height={ 300 } data={ volumeChart }>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend formatter={ formatColour } />
          <Bar dataKey="load" barSize={ 13 } fill="#E2C044" />
          <Bar dataKey="volume" barSize={ 13 } fill="#DBE2E6" />
          <Bar dataKey="work" barSize={ 13 } fill="#90E0F3" />
        </BarChart>
      </div>
      <div style={ { position: 'absolute', marginTop: 0, marginLeft: 800 } }>
        <BarChart width={ 750 } height={ 300 } data={ volumeChart }>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend formatter={ formatColour } />

          <Bar dataKey="loadPercentage" name="load %" barSize={ 13 } fill="#9DBF9E" />
          <Bar dataKey="volumePercentage" name="volume %" barSize={ 13 } fill="#FF8552" />
          <Bar dataKey="workPercentage" name="work %" fill="#2D898B" />
        </BarChart>
      </div>
    </>

  );
};

export default VolumeChart;
