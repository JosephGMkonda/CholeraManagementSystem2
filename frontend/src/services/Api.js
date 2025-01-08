import axios from "axios";


const BASE_URL = "http://localhost:5000/api/v1/Choloremanagement";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type" :"application/json"
    }
});


export const FetchPatientsData = async () => {
    try{
        
        const response = await apiClient.get("/");
    
        return response.data;


    } catch(error){
        console.log("Error Fetching patients: ", error);
        throw error;


    }
}


export const FetchStatisticsData = async () => {
    try{
    
        const response = await apiClient.get("/statistics");
        
        return response.data;


    } catch(error){
        console.log("Error Fetching patients: ", error);
        throw error;


    }
}

export const FetchTAStatisticsData = async () => {
    try{
    
        const response = await apiClient.get("/stat");
        console.log("API call successful, response:", response.data);
        return response.data;


    } catch(error){
        console.log("Error Fetching patients: ", error);
        throw error;


    }
}


export const FetchGenderStatData = async () => {
    try{
    
        const response = await apiClient.get("/gender-stat");
        console.log("API call Gender successful, response:", response.data);
        return response.data;


    } catch(error){
        console.log("Error Fetching patients: ", error);
        throw error;


    }
}


export const FetchVillageStatData = async () => {
    try{
    
        const response = await apiClient.get("/village-stat");
        console.log("API call Village successful, response:", response.data);
        return response.data;


    } catch(error){
        console.log("Error Fetching patients: ", error);
        throw error;


    }
}

export const createPatient = async (patientData) => {
    try {

        const response = await apiClient.post('/create', patientData);

        
        return response.data;
        
    } catch (error) {
        console.error("Error adding patient: ", error);
        throw error;
        
    }
}

