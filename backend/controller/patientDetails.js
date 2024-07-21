const { Doctor } = require("../models/doctorModel");
const { doctorpatient } = require("../models/doctorpatient");
const { Patient } = require("../models/patientModel");

const patientdata = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        // Fetch patient data
        const patientData = await Patient.findOne({ where: { patientid: patientId } });
        if (!patientData) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Fetch doctor-patient relationship
        const doctorpatientRelation = await doctorpatient.findOne({ where: { patientid: patientId }, attributes: ['doctorid'] });

        let doctorData;
        if (doctorpatientRelation) {
            // Fetch doctor data
            doctorData = await Doctor.findOne({ where: { doctorid: doctorpatientRelation.doctorid } });
        }

        // Combine patient and doctor data
        const response = {
            patient: {
                id: patientData.patientid,
                name: patientData.name,
                email: patientData.email,
            },
            doctor: doctorData ? {
                name: doctorData.name,
                specialty: doctorData.specialty
            } : {
                name: 'Doctor not assigned yet',
                specialty: ' '
            }
        };
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { patientdata };
