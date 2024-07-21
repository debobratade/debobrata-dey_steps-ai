const { Doctor } = require("../models/doctorModel");
const { Patient } = require("../models/patientModel");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email in both Doctor and Patient collections
        const doctor = await Doctor.findOne({ where: { email: email } });
        const patient = await Patient.findOne({ where: { email: email } });

        let user;
        if (doctor) {
            user = doctor;
        } else if (patient) {
            user = patient;
        }

        if (user) {
            // Check if the password matches
            if (user.password === password) {
                // Prepare user data
                const data = {
                    id: user.doctorid || user.patientid,
                    name: user.name,
                    email: user.email,
                    role: doctor ? 'doctor' : 'patient',
                    specialty: doctor ? user.specialty : undefined
                }
                return res.status(200).json({ message: true, comment: "Login successful", user: data });
            } else {
                return res.status(401).json({ message: false, comment: "Incorrect password" });
            }
        } else {
            return res.status(401).json({ message: false, comment: "Email not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: false, comment: err.message });
    }
};

module.exports = { login };
