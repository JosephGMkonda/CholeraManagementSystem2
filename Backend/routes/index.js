import {Router} from "express";
import { createPatient, deletePatient, getAllPatients, getPatient, updatePatient,getPatientStatistics, getTraditionatalStat } from "../handler/index.js";

const appRouter = Router();

appRouter.get("/", getAllPatients);
appRouter.get("/:id", getPatient);
appRouter.post("/create", createPatient);
appRouter.put("/update/:id", updatePatient);
appRouter.delete("/delete/:id", deletePatient);
appRouter.get("/statistics",getPatientStatistics);
appRouter.get("/stat", getTraditionatalStat);


export default appRouter;