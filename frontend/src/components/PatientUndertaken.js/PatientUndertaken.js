import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientUndertaken.css';

const PatientUndertaken = () => {
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState(null); // State to store doctorId
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const data = JSON.parse(localStorage.getItem('data'));

      if (data && data.id) {
        try {
          setDoctorId(data.id); // Set doctorId from local storage
          const response = await fetch(`http://localhost:5000/patients/${data.id}`);
          const result = await response.json();
          setPatients(result);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      }
    };

    fetchPatients();
  }, []);

  const handleViewDetails = (patientId) => {
    // Navigate to patient details page
    navigate(`/patientdetails/${patientId}`);
  };

  const handleDeletePatient = async (patientId) => {
    if (doctorId === null) {
      alert('Doctor ID is missing');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/doctorpatient/${doctorId}/${patientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Patient deleted successfully');
        setPatients(patients.filter(patient => patient.patientId !== patientId));
      } else {
        alert('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Error deleting patient');
    }
  };

  return (
    <div className="patient-undertaken">
      <h1>Patients Undertaken</h1>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Patient Name</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.patientId}>
              <td>{index + 1}</td>
              <td>{patient.patientName}</td>
              <td>
                <button onClick={() => handleViewDetails(patient.patientId)}>Get Details</button>
              </td>
              <td>
                <button onClick={() => handleDeletePatient(patient.patientId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientUndertaken;
