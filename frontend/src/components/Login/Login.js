import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [emailValid, setEmailValid] = useState(true); // State for email validation
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const getData = async () => {
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }

    setEmailValid(true);

    try {
      let result = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      if (result.message === true) {
        console.log(result.user.role)
        localStorage.setItem('data', JSON.stringify(result.user));
        if (result.user.role === 'doctor') {
          navigate('/');
        } else {
          navigate('/patient');
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="signup-container">
      <div className="signup-box">
        <Form className="signup-form" onSubmit={(e) => { e.preventDefault(); getData(); }}>

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
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn">
            Log In
          </Button>
          <span className="ask">Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
