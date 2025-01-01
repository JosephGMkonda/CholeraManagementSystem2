import React, { useEffect, useState } from "react";

import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

import { FetchPatientsData } from "../services/Api";


const Patient = () => {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

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
        throw error;
        
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);


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
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr className="border-b" key={index}>
                    <td className="py-2 px-4">{patient.custom_id}</td>
                    <td className="py-2 px-4">{patient.fullname}</td>
                    <td className="py-2 px-4">
                      
                      {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()}
                    </td>
                    <td className="py-2 px-4">{patient.gender}</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-500"><BsFillPencilFill/></button>
                    </td>
                    <td className="py-2 px-4">
                      <button className="text-blue-500"><BsFillTrashFill/></button>
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
    </div>
  );
};

export default Patient;
