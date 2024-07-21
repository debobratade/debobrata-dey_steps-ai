import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setspecialty] = useState('');
  const [password, setPass] = useState('');
  const [role, setRole] = useState('doctor'); // Default to 'doctor'
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Password validation criteria
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const getData = async () => {
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordValid(false);
      return;
    }

    setEmailValid(true);
    setPasswordValid(true);

    try {
      console.warn(name, email, specialty, password, role);
      let result = await fetch('http://localhost:5000/signup', {
        method: 'post',
        body: JSON.stringify({ name, email, specialty, password, role }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      if (result.message === "success") {
        console.warn(result);
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="signup-container">
      <div className="signup-box">
        <Form className="signup-form" onSubmit={(e) => { e.preventDefault(); getData(); }}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </Form.Group>

          <Form.Group controlId="formRole" className="mb-3">
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </Form.Control>
          </Form.Group>

          {role === 'doctor' && (
            <Form.Group controlId="formspecialty" className="mb-3">
              <Form.Control type="text" value={specialty} onChange={(e) => setspecialty(e.target.value)} placeholder="Enter specialty" />
            </Form.Group>
          )}

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailValid(true); // Reset validation on input change
              }}
              placeholder="Enter email"
              className={!emailValid ? 'is-invalid' : ''}
            />
            {!emailValid && (
              <Form.Text className="text-danger">
                Please provide a valid email address.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPass(e.target.value);
                setPasswordValid(true); // Reset validation on input change
              }}
              placeholder="Password"
              className={!passwordValid ? 'is-invalid' : ''}
            />
            {!passwordValid && (
              <Form.Text className="text-danger">
                Password must be at least 6 characters long, contain at least one alphabet, one number, and one special character (@$!%*?&).
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="btn">
            Sign Up
          </Button>
          <span className="ask">Already have an account? <Link to="/login">Log In</Link></span>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
