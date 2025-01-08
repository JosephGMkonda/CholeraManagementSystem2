import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill,BsClipboard2Check, BsFillPencilFill, BsFillTrashFill,  BsChevronDoubleRight, BsChevronDoubleLeft} from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FetchPatientsData } from "../services/Api";
import {QRCodeSVG} from 'qrcode.react';


const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  

  
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
  const handleClipboardClick = (patient) => {
    setSelectedPatient(patient);
    setShowPopup(true);
  };

  const handlePopupClose = () => setShowPopup(false);

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
                      <button 
                      className="px-2 text-blue-500" 
                      onClick={() => handleClipboardClick(patient)}>
                        <BsClipboard2Check/>
                        </button>
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


      {showPopup && (
       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
       <div className="bg-white rounded-xl shadow-2xl p-8 w-11/12 sm:w-2/3 lg:w-1/2">
         <div className="flex justify-between items-center border-b pb-4 mb-6">
           <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
           <button 
             onClick={handlePopupClose} 
             className="text-gray-500 hover:text-red-500 text-2xl"
           >
             &times;
           </button>
         </div>
     
         <div className="grid gap-4">
           <div className="flex justify-center mb-6">
             <QRCodeSVG 
               value={JSON.stringify(selectedPatient)} 
               size={150} 
               className="shadow-md"
             />
           </div>
           <div className="space-y-3">
             <p><span className="font-bold">Patient ID:</span> {selectedPatient.custom_id}</p>
             <p><span className="font-bold">Name:</span> {selectedPatient.fullname}</p>
             <p>
               <span className="font-bold">Age:</span> 
               {new Date().getFullYear() - new Date(selectedPatient.date_of_birth).getFullYear()}
             </p>
             <p><span className="font-bold">Gender:</span> {selectedPatient.gender}</p>
             <p>
               <span className="font-bold">Status:</span> 
               <span className={`font-semibold px-2 py-1 rounded-md ${
                 selectedPatient.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
               }`}>
                 {selectedPatient.status}
               </span>
             </p>
             <p>
               <span className="font-bold">Admission Status:</span> 
               <span className="text-indigo-600 font-medium">{selectedPatient.admission_status}</span>
             </p>
             <p><span className="font-bold">Symptoms:</span> {selectedPatient.symptoms}</p>
             <p><span className="font-bold">Treatment Plan:</span> {selectedPatient.treatment_plan}</p>
             <p><span className="font-bold">Date:</span> {selectedPatient.created_at}</p>
           </div>
         </div>
       </div>
     </div>
     
      )}

    </div>
  );
};

export default Patient;
