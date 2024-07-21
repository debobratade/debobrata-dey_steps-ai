const { Doctor } = require('./doctorModel');
const { doctorpatient } = require('./doctorpatient');
const { Patient } = require('./patientModel');
const { PDF } = require('./pdfModel');


Doctor.hasMany(PDF, {
  foreignKey: 'doctorid',
});

PDF.belongsTo(Doctor, {
  foreignKey: 'doctorid',
});

Doctor.belongsToMany(Patient, {
  through: doctorpatient,
  foreignKey: 'doctorid',
  otherKey: 'patientid',
});

Patient.belongsToMany(Doctor, {
  through: doctorpatient,
  foreignKey: 'patientid',
  otherKey: 'doctorid',
});
