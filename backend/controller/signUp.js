const { Doctor } = require("../models/doctorModel");
const { Patient } = require("../models/patientModel");

const signUp = async (req, res) => {
    try {
        const { name, email, specialty, password, role } = req.body;

        // Check if a user with the same email already exists
        let existingUser = null;
        if (role === 'doctor') {
            existingUser = await Doctor.findOne({ where: { email: email } });
        } else if (role === 'patient') {
            existingUser = await Patient.findOne({ where: { email: email } });
        }

        if (existingUser != null) {
            return res.status(400).json({
                message: "A user with this email already exists."
            });
        }

        let newUser;
        if (role === 'doctor') {
            newUser = await Doctor.create({ name, email, specialty, password });
        } else if (role === 'patient') {
            newUser = await Patient.create({ name, email, password });
        }

        res.status(201).json({
            message: "success",
            comment: `New ${role} details are saved.`,
            user: newUser
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { signUp };
