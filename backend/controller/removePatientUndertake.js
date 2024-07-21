const { doctorpatient } = require("../models/doctorpatient");

const deletePatientFromDoctor = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    // Delete the record from the doctorpatient table
    const result = await doctorpatient.destroy({
      where: {
        doctorid: doctorId,
        patientid: patientId,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: 'No record found to delete' });
    }

    return res.status(200).json({ message: 'Patient successfully deleted from doctor' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { deletePatientFromDoctor };
