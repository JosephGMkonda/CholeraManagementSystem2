
import { pool } from "./connection.js";
import { v4 as uuidv4 } from 'uuid';

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



export const create = async ( 

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
     const customId = uuidv4().split('-').join('').slice(0, 8)
    const QUERY = `INSERT INTO patients( 

 custom_id,   
 fullname,          
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
      
 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`

 try {
    const client = await pool.getConnection();
    const createResult = await client.query(QUERY,[ 
        customId,
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
        ]);
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

export const getStatistics = async () => {
    const statusQuery = `
      SELECT 
        status,
        COUNT(*) AS count
      FROM
        patients
      WHERE
        status IN ('Active', 'Recovered', 'Deceased')
      GROUP BY
        status;
    `;
  
    const totalQuery = `SELECT COUNT(*) AS total_patients FROM patients;`;
  
    let client;
  
    try {
      client = await pool.getConnection();
      console.log("Database connection established.");
  
      const statusResults = await client.query(statusQuery);
      console.log("Status Results:", statusResults);
  
      const totalResult = await client.query(totalQuery);
      console.log("Total Result:", totalResult);
  
      const statusCounts = { Active: 0, Recovered: 0, Deceased: 0 };
  
      statusResults.forEach((row) => {
        if (row.status === 'Active') statusCounts.Active = row.count;
        else if (row.status === 'Recovered') statusCounts.Recovered = row.count;
        else if (row.status === 'Deceased') statusCounts.Deceased = row.count;
      });
  
      const totalPatients = totalResult[0]?.total_patients || 0;
  
      return { ...statusCounts, totalPatients };
    } catch (error) {
      console.error("Error occurred while getting statistics:", error);
      throw error;
    } finally {
      if (client) client.release();
      console.log("Database connection released.");
    }
  };
  


//   Traditionatal statistics

export const TraditionatalStat = async () => {

    const Query = `SELECT 
    tradition_authority,
    COUNT(*) AS total_patients
FROM 
    patients
GROUP BY 
    tradition_authority;`;

    try {
    const client = await pool.getConnection();
    const getResults = await client.query(Query);

    return getResults;

        
    } catch (error) {

        console.error("Error occurred while getting statistics:", error);
        throw error;   
        
    }
}