import { find, create,findById,getStatistics,getTraditionalStatistics,getGenderStat,getVillageStat } from "../DBConnection/quary.js";



export const getVillageStatistics = async (req,res) => {
    try {
        const Patients = await getVillageStat();
        
        return res.status(200).json({Patients});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error Occurred"});
        
    }
};


export const getGenderStatistics = async (req,res) => {
    try {
        const Patients = await getGenderStat();
        
        return res.status(200).json({Patients});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error Occurred"});
        
    }
};

export const getPatientsStat = async (req,res) => {
    try {
        const Patients = await getStatistics();
        
        return res.status(200).json({Patients});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error Occurred"});
        
    }
};


export const getTraditionalStat = async (req, res) => {
    try{
    const stat = await getTraditionalStatistics();
    
    return res.status(200).json({ patient: stat });

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
export const getPatient= async (req,res) => {
    const id = req.params.id;
    try {
        const patient = await findById(id);
        return res.status(200).json({patient})
    } catch (error) {
         console.log(error);
        res.status(500).json({message: "Error Occurred"});
    }

};

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









