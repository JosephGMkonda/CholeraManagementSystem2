import {Router} from "express";
import { createPatient, deletePatient, getAllPatients, getPatient, updatePatient } from "../handler/index.js";

const appRouter = Router();

appRouter.get("/", getAllPatients);
appRouter.get("/:id", getPatient);
appRouter.post("/create", createPatient);
appRouter.put("/update/:id", updatePatient);
appRouter.delete("/delete/:id", deletePatient);


export default appRouter;