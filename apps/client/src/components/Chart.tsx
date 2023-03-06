import React, { useState } from 'react';
import {
  PieChart,
  pieChartDefaultProps,
  PieChartProps,
} from 'react-minimal-pie-chart';
import { IDataItem } from '../pages/Home';

interface IChartProps {
  data: IDataItem[];
  setPieStatus: any;
}

const Chart = ({ data, setPieStatus }: IChartProps) => {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const myData = data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: '#fce58b',
      };
    }
    return entry;
  });

  const lineWidth = 60;
  return (
    <div className='w-[250px] m-2'>
      <PieChart
        style={{
          fontFamily:
            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
          fontSize: '8px',
        }}
        data={myData}
        radius={pieChartDefaultProps.radius - 6}
        lineWidth={60}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={(index) => (index === selected ? 6 : 1)}
        animate
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: '#fff',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
        onClick={(_, index) => {
          setSelected(index === selected ? undefined : index);
          console.log(_);
          setPieStatus(myData[index]);
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(undefined);
        }}
      />
    </div>
  );
};

export default Chart;
