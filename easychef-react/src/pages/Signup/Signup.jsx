import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Signup.css";
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword2] = useState('');
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState('');

  const [errors, setErrors] = useState({});



  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastName = (event) => {
    setLastName(event.target.value);
  }

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePhone = (event) => {
    setPhone(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handlePassword2 = (event) => {
    setPassword2(event.target.value);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }

  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('phone_number', phone_number);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password1', password1);
    if(file)
      {
        formData.append('avatar', file, file.name)
      }

      const response = await fetch('http://127.0.0.1:8000/accounts/signup/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/signupsuccess");
      } else {
        let errorMessage = '';
        for (const key in data) {
          errorMessage += `${key}: ${data[key]}<br />`;
        }
        setResponseMessage(errorMessage);
      }
  
  }


  return (
    <Container fluid className="signup-container">
      <Row>
        <Col md={6} className="signup-left">
          <div className="signup-logo">
          {imagePreview ? (
            <img src={imagePreview} alt="Avatar Preview" style={{ maxWidth: '300px', maxHeight: '300px', border: '5px solid black' }} />
          ) : ( 
            <span style={{border: '5px solid black'}}>No Image Selected</span>
          )}
            {/* <img
              src="https://via.placeholder.com/150"
              alt="Logo"
              className="img-fluid"
            /> */}
            <h2>Sign Up</h2>
          </div>
        </Col>
        <Col md={6} className="signup-right">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" onChange={handleFirstName} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" onChange={handleLastName} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" required={true} onChange={handleUsername} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required={true} onChange={handleEmail} />
            </Form.Group>
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter Phone Number" onChange={handlePhone} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required={true} onChange={handlePassword} />
            </Form.Group>
            <Form.Group controlId="formBasicRepeatPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" placeholder="Repeat Password" required={true} onChange={handlePassword2} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <div
              className="response"
              dangerouslySetInnerHTML={{ __html: responseMessage }}
            ></div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
