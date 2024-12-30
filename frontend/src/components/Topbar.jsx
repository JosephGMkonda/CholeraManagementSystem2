import { BsFillBellFill } from "react-icons/bs";

const Topbar = () => {


    return(

     <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] py-[20px] bg-white fixed top-0 left-0 w-full z-40">

        <div>

        </div>

     

     <div className="flex items-center ">

        <div className="relative px-[0px]">
        <BsFillBellFill className="text-xl"/>
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
                        inline-flex items-center justify-center 
                        w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
         3
        </span>
        </div>
       


        <div className="flex items-center px-[20px]">
            <p>Chisomo Banda</p>
            <div >
            <img 
            src="personaimage2.jpg" 
            alt="Logo" 
            className="w-10 h-10 rounded-full object-cover"
            />

            </div>
        </div>

        </div>

</div>
    )

}

export default Topbar;