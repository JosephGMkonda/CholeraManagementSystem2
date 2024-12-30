import {Link} from 'react-router-dom'

import { BsGrid3X3GapFill,BsPeopleFill,BsReception4 } from "react-icons/bs";

const Sidebar = () => {

   return(
    <div className="bg-[#434edf] h-full w-[18%] fixed top-0 left-0 z-50">

        <div className="px-[20px] py-[10px] items-center justify-center border-b-[1px] ">
            <h1 className="text-white text-[13px] leading-[34px] font-extrabold cursor-pointer">Cholera Management System</h1>
            <div>
            <h1 className="text-white text-[20px] leading-[34px] font-extrabold cursor-pointer">CHMS</h1>
         </div>

       
        
        </div>

        <Link to="/dashboard" className="flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer text-white">
        <BsGrid3X3GapFill />
        <span className="font-bold"> Dashboard </span>
        
        </Link>


        <Link to="/patients" className="flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer text-white">
        <BsPeopleFill />
        <span className="font-bold"> Patient </span>
        
        </Link>

        <Link to="/reports" className="flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer text-white">
        <BsReception4 />
        <span className="font-bold"> Reports </span>
        
        </Link>





    </div>
   )


}

export default Sidebar;