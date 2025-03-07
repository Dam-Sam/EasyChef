import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import backgroundvid from './Backgroundvid.mp4';
import './Videomain.css';

const Video = () => {

  return (
    <div className="video">
      <video autoPlay loop muted>
        <source src={ backgroundvid } type="video/mp4" />
      </video>
      <div className="overlay">
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <h1 className="video-title">Start Cooking Now</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={3} className="text-center">
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="outline-light" className="btn-custom">
                    Sign Up
                </Button>
              </Link>  
            </Col>
            <Col md={3} className="text-center">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outline-light" className="btn-custom">
                  Log In
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Video;
