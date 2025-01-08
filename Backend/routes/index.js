import {Router} from "express";
import { createPatient, deletePatient, getAllPatients, getPatient, updatePatient,getPatientsStat,getVillageStatistics, getGenderStatistics, getTraditionalStat } from "../handler/index.js";

const appRouter = Router();

appRouter.get("/", getAllPatients);
appRouter.get("/statistics", getPatientsStat);
appRouter.get("/stat", getTraditionalStat);
appRouter.get("/gender-stat", getGenderStatistics);
appRouter.get("/village-stat", getVillageStatistics);
appRouter.get("/:id", getPatient);
appRouter.post("/create", createPatient);
appRouter.put("/update/:id", updatePatient);
appRouter.delete("/delete/:id", deletePatient);




export default appRouter;