import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import './AddPatient.css'; 

const AddPatient = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch all patients from the API
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/getallpatient');
                const result = await response.json();
                setPatients(result);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatients();
    }, []);

    const handleAddClick = async (patientId) => {
        const data = JSON.parse(localStorage.getItem('data'));
        const doctorId = data.id;
    
        try {
          const response = await fetch('http://localhost:5000/addpatienttodoctor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ patientId, doctorId }),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            alert('Patient successfully assigned to doctor.');
          } else {
            alert(`Failed to assign patient: ${result.message}`);
          }
        } catch (error) {
          console.error('Error adding patient to doctor:', error);
          alert('An error occurred. Please try again later.');
        }
      };

    return (
        <Container className="add-patient-container">
            <h2>Patient List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={patient.id}>
                            <td>{index + 1}</td>
                            <td>{patient.name}</td>
                            <td>
                                <Button 
                                    variant="primary" 
                                    onClick={() => handleAddClick(patient.id)}
                                >
                                    Add
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AddPatient;
