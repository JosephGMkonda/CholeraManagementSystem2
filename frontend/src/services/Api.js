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
        console.log("Starting API call...");
        const response = await apiClient.get("/");
        console.log("API call successful, response:", response.data);
        return response.data;


    } catch(error){
        console.log("Error Fetching patients: ", error);
        throw error;


    }
}


export const createPatient = async (patientData) => {
    try {

        const response = await apiClient.post('/create', patientData);

        console.log("Patient data add here is the data ", response)
        return response.data;
        
    } catch (error) {
        console.error("Error adding patient: ", error);
        throw error;
        
    }
}

