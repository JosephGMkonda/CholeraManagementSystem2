import { find } from "../DBConnection/quary.js";




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

    
    const errors = [];

    if (!fullname || typeof fullname !== 'string' || fullname.trim().length < 20) {
        errors.push("Full name is required ");
    }

    if (!['male', 'female', 'other'].includes(gender)) {
        errors.push("Gender is required");
    }

    if (!date_of_birth || isNaN(new Date(date_of_birth).getTime())) {
        errors.push("A valid date of birth is required.");
    }

    if (!district || typeof district !== 'string' || district.trim().length < 20) {
        errors.push("District is required ");
    }

    if (!hospital || typeof hospital !== 'string' || hospital.trim().length < 20) {
        errors.push("Hospital is required");
    }

    if (!status || typeof status !== 'string') {
        errors.push("Status is required.");
    }

    if (!admission_status || !['admitted', 'discharged', 'pending'].includes(admission_status)) {
        errors.push("Admission status is required");
    }

    if (date_of_admission && isNaN(new Date(date_of_admission).getTime())) {
        errors.push("If provided, date of admission must be a valid date.");
    }

    if (date_of_discharge && isNaN(new Date(date_of_discharge).getTime())) {
        errors.push("If provided, date of discharge must be a valid date.");
    }

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        errors.push("Symptoms are required ");
    }

    if (!treatment_plan || typeof treatment_plan !== 'string' || treatment_plan.trim().length < 5) {
        errors.push("Treatment plan is required");
    }

    
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    
    try {
        const newPatient = await Patient.create({
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
        });

        res.status(201).json({ success: true, data: newPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error });
    }
};

export const updatePatient = async (req,res) => {};
export const deletePatient = async (req,res) => {};









