const { doctorpatient } = require("../models/doctorpatient");
const { Patient } = require("../models/patientModel");

const getPatientsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Step 1: Get patient IDs for the given doctor
    const doctorPatientRecords = await doctorpatient.findAll({
      where: { doctorid: doctorId },
      attributes: ['patientid'], 
    });

    // Step 2: Extract patient IDs
    const patientIds = doctorPatientRecords.map(record => record.patientid);

    // Step 3: Fetch patient details using the patient IDs
    const patients = await Patient.findAll({
      where: { patientid: patientIds },
      attributes: ['patientid', 'name'],
    });

    // Step 4: Format the results
    const result = patients.map((patient, index) => ({
      serial: index + 1,
      patientId: patient.patientid,
      patientName: patient.name,
    }));

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getPatientsByDoctorId };
