

import React, { useEffect, useState } from 'react';
import { FetchVillageStatData } from '../services/Api'; 

const VillagesStat = () => {
    const [villageData, setVillageData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await FetchVillageStatData();
          if (response && response.Patients) {
            setVillageData(response.Patients);
          }
        } catch (error) {
          console.error('Error fetching village statistics:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md h-full overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Village Patient Statistics
        </h2>
        <div className="overflow-auto h-[200px]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
            <thead className="bg-gray-200 text-gray-600 uppercase">
              <tr>
                <th className="py-2 px-4 text-left">Village</th>
                <th className="py-2 px-4 text-center">Patient Count</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {villageData.map((village, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-300 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="py-2 px-4 text-left">{village.village}</td>
                  <td className="py-2 px-4 text-center">{village.patient_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default VillagesStat;
  
