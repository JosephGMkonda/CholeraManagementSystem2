import { find, create,getStatistics,TraditionatalStat } from "../DBConnection/quary.js";




export const getPatientStatistics = async (req,res) => {

    try {
        const statistics = await getStatistics();
        return res.status(200).json({statistics})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error Occurred"});
        
    }

}

export const getTraditionatalStat = async (req, res) => {
    try{
    const stat = await TraditionatalStat();
    return res.status(200).json(stat);

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error Occurred"});

    }finally{

    }
}



export const getAllPatients = async (req,res) => {
    try {
        const Patients = await find();
        return res.status(200).json({Patients});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error Occurred"});
        
    }
};
export const getPatient= async (req,res) => {};

export const createPatient = async (req, res) => {
    const {
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
    } = req.body;


    
    try {
        
        const newPatient = await create(
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
        );

        res.status(201).json({ success: true, data: newPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error });
    }
};

export const updatePatient = async (req,res) => {};
export const deletePatient = async (req,res) => {};









