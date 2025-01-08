import react, {useEffect, useState} from 'react'

import { BsClipboard2Check} from "react-icons/bs";
import { FetchStatisticsData } from "../services/Api";
import BarChartStatitics from '../components/BarChartStatitics';
import GenderPieChart from '../components/GenderPieChart'
import VillagesStat from '../components/VillagesStat'

const Dashboard = () => {
    const [statistics, setStatistics] =useState({
    Active: 0,
    Recovered: 0,
    Deceased: 0,
    totalPatients: 0,
       
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            setError(null);
    
            const response = await FetchStatisticsData(); 
            console.log(response)
            if (response && response.Patients) {
              setStatistics(response.Patients);
            } else {
              setError('Failed to load data');
            }
          } catch (err) {
            console.error('Error fetching data:', err);
            setError('An error occurred while fetching data');
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return(
        <div className="pt-[25px] px-[25px] bg-[#F8F9FC]">
            <div className="flex items-center">
            <h1 className="dashboard-title text-gray-500 text-[20px] leading-[34px] font-normal">
            Dashboard
        </h1>

            </div>

            <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
            <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-transform duration-200 ease-in-out">

                    <div>
                    <h2 className="active-cases-title text-gray-700 text-[16px] font-medium">Active Cases</h2>
                <h1 className="active-cases-count text-black text-[24px] font-bold">{statistics.Active}</h1>
                 </div>
                 <BsClipboard2Check/>
                </div>

                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#68b643] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-transform duration-200 ease-in-out">

<div>
<h2 className="active-cases-title text-gray-700 text-[16px] font-medium">Recovered</h2>
<h1 className="active-cases-count text-black text-[24px] font-bold"> {statistics.Recovered}</h1>
</div>
<BsClipboard2Check/>
</div>


<div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#ec5252] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-transform duration-200 ease-in-out">

<div>
<h2 className="active-cases-title text-gray-700 text-[16px] font-medium">Deceased</h2>
<h1 className="active-cases-count text-black text-[24px] font-bold">{statistics.Deceased}</h1>
</div>
<BsClipboard2Check/>
</div>

<div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#ebe852] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-transform duration-200 ease-in-out">

<div>
<h2 className="active-cases-title text-gray-700 text-[16px] font-medium"> Accumulated Cases</h2>
<h1 className="active-cases-count text-black text-[24px] font-bold">  {statistics.totalPatients}</h1>
</div>
<BsClipboard2Check/>
</div>

            </div>



            <div className="flex mt-[22px] w-full gap-[30px]">
                <div className="basis-[70%]">
                  <div>
                  Summary of Cases by Traditional Authority
                  </div>
                  <div>
                  <BarChartStatitics/>

                  </div>
                    
                </div>

                <div className="basis-[30%]">
                  <div>
                    Gender Distribution
                  </div>
                  <div>
                  <GenderPieChart/>

                  </div>
              
                </div>


               
            </div>

            <div>
                  <div className='basis-[50%] h-[300px] overflow-hidden'>
                    <VillagesStat/>
                  </div>
                  
                </div>

            
        
        </div>

    )
}

export default Dashboard