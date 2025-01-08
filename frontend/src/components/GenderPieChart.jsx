import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FetchGenderStatData } from '../services/Api'; 

const COLORS = ['#0088FE', '#FF8042']; 
const GenderPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchGenderStatData();
        if (response && response.Patients) {
          const formattedData = response.Patients.map(item => ({
            name: item.gender,
            value: item.count,
          }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching gender statistics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default GenderPieChart;
