import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

const Patient = () => {
  return (
    <div className="container py-[20px] px-[30px]">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-500">
          <button className="flex justify-center items-center py-[10px] h-[30px] rounded-[10px] px-[10px] bg-blue-500 text-white">
            <BsFillPersonPlusFill />
            Add
          </button>
        </div>

        <div className="flex items-center rounded-[5px]">
          <input
            type="text"
            placeholder="Search by patient ID"
            className="w-full h-[40px] px-4 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-[5px]">
            <BsSearch color="white" />
          </div>
        </div>
      </div>

      
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Patient ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Age</th>
              <th className="py-2 px-4 text-left">Gender</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data for patients */}
            <tr className="border-b">
              <td className="py-2 px-4">12345</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">45</td>
              <td className="py-2 px-4">Male</td>
              <td className="py-2 px-4">
                <button className="text-blue-500">View</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">12346</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">34</td>
              <td className="py-2 px-4">Female</td>
              <td className="py-2 px-4">
                <button className="text-blue-500">View</button>
              </td>
            </tr>
            {/* More patient rows can be added here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patient;
