import {createPool} from "mysql2/promise"

const pool = createPool ({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'choleramanagement',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,



});


const connectionToDB = async() =>  {

    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("Connection to database is successfully");
    } catch (error) {

        console.error("Database connection error:", error.message);
        console.log(error)
        throw error;
        
        
    }
    
}


export  {connectionToDB, pool};