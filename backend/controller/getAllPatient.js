const { Patient } = require("../models/patientModel");

const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: ['patientid', 'name'],  
    });
    
    // Map through patients to return in a cleaner format 
    const patientList = patients.map(patient => ({
      id: patient.patientid,
      name: patient.name,
    }));
    return res.status(200).json(patientList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPatient };
