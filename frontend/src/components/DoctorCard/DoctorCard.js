import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorCard.css';
import imageLogo from '../../images/logo3.jpg';

const DoctorCard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let data = localStorage.getItem('data');
  data = JSON.parse(data);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const userData = JSON.parse(localStorage.getItem('data'));
    if (!userData || !userData.id) {
      alert("User ID not found in local storage");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('id', userData.id);

    try {
      const response = await fetch('http://localhost:5000/uploadpdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.warn(result);
        alert(result.message || 'File uploaded successfully');
        setSelectedFile(null);  // Reset the selected file
        fileInputRef.current.value = '';  // Clear the file input
        navigate('/');
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className='main-wrapper'>
      <div className='wrapper'>
        <div className='upper'>
          <div className='profile-image'>
            <img src={imageLogo} alt="Display is missing" />
          </div>
          <div className='details'>
            <span>Name: {data.name}</span>
            <span>Specialty: {data.specialty}</span>
            {/* <span>Total PDF uploaded: 10</span>
            <span>Total patient undertaken: 4</span> */}
          </div>
        </div>
        <input
          className='pdf-handler'
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className='card-btn'>
          <button onClick={handleFileUpload}>Upload PDF</button>
          <button onClick={()=>navigate('/pdflist')}>See PDF</button>
          <button onClick={()=>navigate('./patientundertaken')}>Patient</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
