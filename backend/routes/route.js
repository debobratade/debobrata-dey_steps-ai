const express = require('express')
const router = express.Router()

// File path
const login = require('../controller/login')
const signUp = require('../controller/signUp')
const upload = require('../config/multerConfig')
const { getPdf } = require('../controller/getPdf')
const { viewpdf } = require('../controller/viewPdf')
const { uploadpdf } = require('../controller/uploadPdf')
const { deletePdf } = require('../controller/deletePdf');
const { patientdata } = require('../controller/patientDetails');
const { getAllPatient } = require('../controller/getAllPatient');
const { addPatientToDoctor } = require('../controller/addPatientToDoctor')
const { getPatientsByDoctorId } = require('../controller/getPatientsByDoctorId');
const { deletePatientFromDoctor } = require('../controller/removePatientUndertake');

// API end-points
router.get('/getpdf', getPdf);
router.get('/viewpdf', viewpdf);
router.post('/login', login.login)
router.post('/signup', signUp.signUp)
router.delete('/deletepdf', deletePdf);
router.get('/getallpatient', getAllPatient)
router.get('/patient/:patientId', patientdata);
router.post('/addpatienttodoctor', addPatientToDoctor);
router.get('/patients/:doctorId', getPatientsByDoctorId);
router.post('/uploadpdf', upload.single('pdf'), uploadpdf);
router.delete('/doctorpatient/:doctorId/:patientId', deletePatientFromDoctor)

module.exports = router