
import  {useState } from 'react'
import { Link } from 'react-router-dom'
import { createPatient } from '../services/Api'
const Form = () => {

    const [formData, setFormData] = useState({
        
        // Person details
        fullname: "",
        gender: "",
        date_of_birth: "",
        district: "",
        village: "",
        tradition_authority: "",
        
        // Hospital details
        hospital: "",
        date_of_admission: "",
        date_of_discharge: "",
        symptoms: "",
        treatment_plan: "",
        admission_status: "",
        status: "",
    })


 const [errors, setErrors] = useState({})
 const [isSubmitted, setIsSubmitted] = useState(false)
 const [submissionMessage, setIsSubmissionMessage] = useState("")



 const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
 }

 const ValidateForm = () => {
    const newErrors = {};
    console.log("Form data before submitting:", formData);

    if (!formData.fullname) newErrors.fullname = "Full name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.tradition_authority) newErrors.tradition_authority = "TA is required.";
    if (!formData.village) newErrors.village = "Village is required.";




    if (!formData.hospital) newErrors.hospital = "Hospital name is required.";
    if (!formData.date_of_admission) newErrors.date_of_admission = "date of admission.";

    if (!formData.symptoms) newErrors.symptoms = "symptoms is required";
    if (!formData.treatment_plan) newErrors.treatment_plan = "treatment plan is required";
    if (!formData.admission_status) newErrors.admission_status = "Admission status is required.";
    if (!formData.status) newErrors.status = "Current status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length  === 0;

 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if(ValidateForm()) {
       setIsSubmitted(true);

       try {
        const response = await createPatient(formData);
        console.log("Patient added successfully:", response);
        setSubmissionMessage("Patient added successfully!");

        setFormData({
          fullname: "",
          gender: "",
          date_of_birth: "",
          district: "",
          village: "",
          tradition_authority: "",
          hospital: "",
          date_of_admission: "",
          date_of_discharge: "",
          symptoms: "",
          treatment_plan: "",
          admission_status: "",
          status: "",
      });



       } catch (error) {
        console.error("Error adding patient:", error);
        setIsSubmissionMessage("Failed to add patient. Please try again.");
        
       }
       finally{
        setIsSubmitted(false);
       }
    }
    else{
        console.log("Form contains errors: ")
    }
 };



    return (
      <div className="p-8 bg-white rounded-lg shadow-md max-w-8xl mx-auto">
      {/* Form Header */}
      <div className="sticky flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add Patient Details</h2>
        <div className="flex space-x-4">
          {/* <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Edit
          </button> */}
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            <Link 
            to='/patients'
            >
            back
            </Link>
          </button>
        </div>
      </div>


      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {/* Personal Details Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>


          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.date_of_birth ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.district ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select District</option>
              <option value="District">Nkhata-bay</option>
              
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>




          <div>
            <label className="block text-sm font-medium text-gray-700">
              Traditional Authority
            </label>
            <select
              name="tradition_authority"
              value={formData.tradition_authority}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.tradition_authority ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select T/A</option>
              <option value="Malanda">Malanda</option>
              
            </select>
            {errors.tradition_authority && (
              <p className="text-red-500 text-sm mt-1">{errors.tradition_authority}</p>
            )}
          </div>



          <div>
            <label className="block text-sm font-medium text-gray-700">
              Village
            </label>
            <select
              name="village"
              value={formData.village}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.village ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Village</option>
              <option value="Village">Village</option>
              
            </select>
            {errors.village && (
              <p className="text-red-500 text-sm mt-1">{errors.village}</p>
            )}
          </div>

          
        </div>






        {/* Hospital Details Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Hospital Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hospital
            </label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.hospital ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Hospital</option>
              <option value="Kamuzu Central Hospital">
                Kamuzu Central Hospital
              </option>
              <option value="DHO">DHO</option>
            </select>
            {errors.hospital && (
              <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Admission</label>
            <input
              type="date"
              name="date_of_admission"
              value={formData.date_of_admission}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.date_of_admission ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date_of_admission && <p className="text-red-500 text-sm mt-1">{errors.date_of_admission}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Discharge</label>
            <input
              type="date"
              name="date_of_discharge"
              value={formData.date_of_discharge}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
  
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admission Status
            </label>
            <select
              name="admission_status"
              value={formData.admission_status}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.admission_status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="status">Status</option>
              <option value="Admitted">
              Admitted
              </option>
              <option value="Discharged">Discharged</option>
              <option value="None">None</option>
            </select>
            {errors.admission_status && (
              <p className="text-red-500 text-sm mt-1">{errors.admission_status}</p>
            )}
          </div>


          <div>
  <label className="block text-sm font-medium text-gray-700">
  Symptoms
  </label>
  <textarea
    name="symptoms"
    value={formData.symptoms}
    onChange={handleChange}
    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
      errors.symptoms ? "border-red-500" : "border-gray-300"
    }`}
    rows="2" 
  ></textarea>
  {errors.symptoms && (
    <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>
  )}
</div>


<div>
  <label className="block text-sm font-medium text-gray-700">
  Treatment Plan
  </label>
  <textarea
    name="treatment_plan"
    value={formData.treatment_plan}
    onChange={handleChange}
    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
      errors.treatment_plan ? "border-red-500" : "border-gray-300"
    }`}
    rows="2" 
  ></textarea>
  {errors.treatment_plan && (
    <p className="text-red-500 text-sm mt-1">{errors.treatment_plan}</p>
  )}
</div>



<div>
            <label className="block text-sm font-medium text-gray-700">
            Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Admission Status</option>
              <option value="Active">
              Active
              </option>
              <option value="Recovered">Recovered</option>
              <option value="Deceased">Deceased</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
        <button
          type="submit"
          className={`w-full py-2 px-4 font-bold rounded-md ${
            isSubmitted ? "bg-gray-500 text-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          disabled={isSubmitted}
          >
          {isSubmitted ? "Submitting..." : "Submit"}
          </button>

        </div>
      </form>
    </div>
    )
}


export default Form;