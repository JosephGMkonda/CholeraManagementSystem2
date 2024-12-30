import { pool } from "./connection.js";

export const find = async () => {
    const QUERY = "SELECT * FROM patients";

    try {
        const client = await pool.getConnection();

        const result = await client.query(QUERY);
        return result;

        
    } catch (error) {
        console.log("Error Occurred while returning the records ", error.message);
        throw error;
    }
}


export const findPatient = async (id) => {

    const QUERY = "SELECT * FROM patients WHERE id = ? ";

    try {
        const client = await pool.getConnection();
        const showResult = await client.query(QUERY,[id]);
        return showResult;

    } catch (error) {
        console.log("Error occcured while finding the patient record", error);
        throw error;
        
    }


}


export const createPatient = async ( fullname,           
    gender,              
    date_of_birth,       
    district,            
    tradition_authority, 
    village,             
    hospital,            
    status,              
    admission_status,    
    date_of_admission,   
    date_of_discharge,   
    symptoms,            
    treatment_plan      
    ) => {
    const QUERY = `INSERT INTO patients( fullname,          
 gender,              
 date_of_birth,       
 district,            
 tradition_authority, 
 village ,            
 hospital,            
 status,              
 admission_status,    
 date_of_admission,   
 date_of_discharge,   
 symptoms,            
 treatment_plan      
 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

 try {
    const client = await pool.getConnection();
    const createResult = await client.query[QUERY,[ fullname,            
        gender,              
        date_of_birth,       
        district,            
        tradition_authority, 
        village,             
        hospital,            
        status,              
        admission_status,    
        date_of_admission,   
        date_of_discharge,   
        symptoms,            
        treatment_plan      
        ]];
        return createResult;
 } catch (error) {
    console.log("error occurred while creating patient,", error);
    throw error;
 }
}




export const updatePatient = async (
    id, 
    fullname,           
    gender,              
    date_of_birth,       
    district,            
    tradition_authority, 
    village,             
    hospital,            
    status,              
    admission_status,    
    date_of_admission,   
    date_of_discharge,   
    symptoms,            
    treatment_plan      
) => {
    const QUERY = `
        UPDATE patients SET 
            fullname = ?, 
            gender = ?, 
            date_of_birth = ?, 
            district = ?, 
            tradition_authority = ?, 
            village = ?, 
            hospital = ?, 
            status = ?, 
            admission_status = ?, 
            date_of_admission = ?, 
            date_of_discharge = ?, 
            symptoms = ?, 
            treatment_plan = ? 
        WHERE id = ?;
    `;

    try {
        const client = await pool.getConnection();
        const updateResult = await client.query(QUERY, [
            fullname,
            gender,
            date_of_birth,
            district,
            tradition_authority,
            village,
            hospital,
            status,
            admission_status,
            date_of_admission,
            date_of_discharge,
            symptoms,
            treatment_plan,
            id 
        ]);
        return updateResult; 
    } catch (error) {
        console.log("Error occurred while updating patient,", error);
        throw error;
    }
};




export const deletePatient = async (id) => {
    const QUERY = `DELETE FROM patients WHERE id = ?;`;

    try {

        const client = await pool.getConnection();
        const deleteResult = await client.query(QUERY, [id]);
        return deleteResult; 

    } catch (error) {
        console.log("Error occurred while deleting patient,", error);
        throw error;
    }
};

