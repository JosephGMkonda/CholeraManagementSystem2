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