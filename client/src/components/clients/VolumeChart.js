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
      <div style={ { position: 'relative', marginLeft: 800, marginTop: -600 } }>
        <BarChart width={ 750 } height={ 300 } data={ volumeChart }>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis unit=" Week" dataKey="week" tick={ { fontSize: 12, fill: '#fff' } } />
          <YAxis tick={ { fontSize: 12, fill: '#fff' } } />
          <Tooltip />
          <Legend formatter={ formatColour } />
          <Bar dataKey="load" barSize={ 13 } fill="#FAC748" />
          <Bar dataKey="volume" barSize={ 13 } fill="#FF8552" />
          <Bar dataKey="work" barSize={ 13 } fill="#69DDFF" />
        </BarChart>
      </div>
      <div style={ { position: 'relative', marginLeft: 800 } }>
        <BarChart width={ 750 } height={ 300 } data={ volumeChart }>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis unit=" Week " dataKey="week" tick={ { fontSize: 12, fill: '#fff' } } />
          <YAxis tick={ { fontSize: 12, fill: '#fff' } } />
          <Tooltip />
          <Legend formatter={ formatColour } />

          <Bar dataKey="loadPercentage" name="load %" barSize={ 13 } fill="#FAC748" />
          <Bar dataKey="volumePercentage" name="volume %" barSize={ 13 } fill="#FF8552" />
          <Bar dataKey="workPercentage" name="work %" fill="#69DDFF" />
        </BarChart>
      </div>
    </>

  );
};

export default VolumeChart;
