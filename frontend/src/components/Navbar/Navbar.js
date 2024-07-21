import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import imageLogo from '../../images/logo1.jpg';
import './Navbar.css';

const Navbarbody = () => {
  let data = localStorage.getItem('data');
  data = JSON.parse(data);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">
          <img src={imageLogo} alt="Display is missing" className="logoStyle" />
          Steps AI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {data ? (
              <>
                {data.role === 'doctor' && (
                  <Nav.Link as={Link} to="/addpatient" className="nav-link-main">
                    Add Patient
                  </Nav.Link>
                )}
                <Nav.Link onClick={logout} className="nav-link-main">
                  Logout [{data.name}]
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup" className="nav-link-auth">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link-auth">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarbody;
