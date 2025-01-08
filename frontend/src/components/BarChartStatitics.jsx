import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FetchTAStatisticsData } from '../services/Api'; 

const BarChartStatitics = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchTAStatisticsData();
        
        if (response && response.patient) {
          
          const formattedData = response.patient.map((item) => ({
            name: item.tradition_authority,
            value: item.total_patients,
          }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart
        width={700}
        height={300}
        data={chartData}
       
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#7E79DFFF" barSize={20} />
      </BarChart>
    </div>
  );
};

export default BarChartStatitics;
