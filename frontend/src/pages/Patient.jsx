import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill,BsClipboard2Check, BsFillPencilFill, BsFillTrashFill,  BsChevronDoubleRight, BsChevronDoubleLeft} from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FetchPatientsData } from "../services/Api";


const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  

  
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5); 

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const response = await FetchPatientsData();
        const fetchedPatients = response?.Patients?.[0] || [];
        setPatients(fetchedPatients);
        console.log(response);
      } catch (error) {
        console.error("Error loading patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  return (
    <div className="container py-[20px] px-[30px]">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-500">
          <button className="flex justify-center items-center py-[10px] h-[30px] rounded-[10px] px-[10px] bg-blue-500 text-white">
            <Link to="/form" className="flex items-center space-x-2 text-white">
              <BsFillPersonPlusFill />
              <span>Add</span>
            </Link>
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

      {loading ? (
        <p>Loading patients...</p>
      ) : (
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
              {currentPatients.length > 0 ? (
                currentPatients.map((patient, index) => (
                  <tr className="border-b" key={index}>
                    <td className="py-2 px-4">{patient.custom_id}</td>
                    <td className="py-2 px-4">{patient.fullname}</td>
                    <td className="py-2 px-4">
                      {/* Calculate age from date_of_birth */}
                      {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()}
                    </td>
                    <td className="py-2 px-4">{patient.gender}</td>
                    <td className="py-2 px-4">
                      <button className="px-2 text-blue-500"><BsClipboard2Check/></button>
                      <button className="px-2 text-blue-500"><BsFillPencilFill/></button>
                      <button className="px-2 text-blue-500"><BsFillTrashFill/></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
        >
          <BsChevronDoubleLeft/>
        </button>
        <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-4"
        >
          < BsChevronDoubleRight/>
        </button>
      </div>
    </div>
  );
};

export default Patient;
