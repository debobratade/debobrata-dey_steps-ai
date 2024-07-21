import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import image from '../../images/patient.png';
import './PatientCard.css';

const PatientDetails = () => {
    const [patient, setPatient] = useState(null);

    let id = JSON.parse(localStorage.getItem('data'));
    const patientId = id.id;

    useEffect(() => {
        // Fetch patient data from API
        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/patient/${patientId}`);
                const result = await response.json();
                console.warn(result);
                setPatient(result);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };

        fetchPatientDetails();
    }, [patientId]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="patient-details-container">
            {/* <Card className="patient-details-card"> */}
                <div className="patient-details-header">
                    <div className="patient-details-left">
                        <h3>Patient Details</h3>
                        <p><strong>Name:</strong> {patient.patient.name}</p>
                        <p><strong>Email:</strong> {patient.patient.email}</p>
                    </div>
                    <div className="patient-image-container">
                        <img src={image} alt="Patient" className="patient-image" />
                    </div>
                    <div className="patient-details-right">
                        <h3>Doctor Details</h3>
                        <p><strong>Name:</strong> {patient.doctor.name}</p>
                        <p><strong>Specialty:</strong> {patient.doctor.specialty}</p>
                    </div>
                </div>
                <Row>
                    <Col>
                        <h4>Doctor's Suggestions</h4>
                        <p className='p-for-h4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque magna vel lorem sollicitudin, in interdum metus commodo.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" href={`/download-report/${patientId}`} className="mt-3">
                            Download Report
                        </Button>
                    </Col>
                </Row>
            {/* </Card> */}
        </Container>
    );
};

export default PatientDetails;
