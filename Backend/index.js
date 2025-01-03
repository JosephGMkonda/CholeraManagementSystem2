import express from 'express'
import cors from 'cors'
import appRouter from './routes/index.js';
import {connectionToDB} from './DBConnection/connection.js'



const app = express();


const corsOptions = {
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE", 
    allowedHeaders: "Content-Type,Authorization", 
  };

// middleware region
app.use(cors(corsOptions)); 
app.use(express.json());
app.use("/api/v1/Choloremanagement", appRouter);

const PORT = process.env.PORT || 5000;

connectionToDB()
.then(() => {
    app.listen(PORT,() => console.log("The app is listerning on port: ", PORT));

})
.catch((error) => {
    console.log("Error Occured when with mysql connection: ", error);
    process.exit(0)
})
