const { doctorpatient } = require("../models/doctorpatient");

const addPatientToDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    const existingAssociation = await doctorpatient.findOne({
      where: { doctorid: doctorId, patientid: patientId }
    });

    if (existingAssociation) {
      return res.status(400).json({ message: "This patient is already assigned to this doctor." });
    }

    await doctorpatient.create({ doctorid: doctorId, patientid: patientId });
    return res.status(200).json({ message: "Patient successfully assigned to doctor." });
  } catch (err) {
    console.error('Error adding patient to doctor:', err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addPatientToDoctor };
