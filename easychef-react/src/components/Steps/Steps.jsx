import React, { useState } from 'react';
import "./Steps.css"
import { Card, Button, CloseButton, Form, Container, Row, Col } from 'react-bootstrap';

const Steps = (props) => {
  const step = {
    description: "",
    prep_time: "",
    cooking_time: "",
    photo: null
  }
  const [steps, setSteps] = useState([]);

  const handleAddStep = () => {
    setSteps([...steps, step]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleStepChange = (event, index, key) => {
    const newSteps = [...steps];
    newSteps[index][key] = event.target.value;
    setSteps(newSteps);
    props.handleCallSteps(steps);
  };

  return (
    <div className="d-flex flex-column" style={{paddingLeft: '10px', paddingRight: '10px'}}>
      <h1>Recipe Steps</h1>
      {steps.map((step, index) => (
        <div className="card-container" style={{paddingBottom: '10px'}}>
        <Card key={index} className="customCard">
          <Card.Title className="customCardTitle " style={{textAlign: 'center', paddingTop: '10px'}}>Step {index+1}</Card.Title>
          <hr />
          <Card.Body>
            <Container>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload Multiple Pictures or Videos</Form.Label>
                    <Form.Control type="file" multiple 
                      onChange={(event) => handleStepChange(event, index, 'photo')}
                    />
                  </Form.Group>
                </Col>
                <Col md={{offset: 7}}>
                  <CloseButton style={{border: 'solid red 5px', borderRadius: '20px'}} onClick={() => handleRemoveStep(index)}/>
                </Col>
              </Row>
              <Row style={{paddingBottom: '10px'}}>
                <Col md={{span: '100%'}}>
                  <Form.Control 
                    as="textarea"
                    style={{height: '100px'}}
                    value={step.description}
                    onChange={(event) => handleStepChange(event, index, 'description')}
                    placeholder="Description" />
                </Col>
              </Row>
              <Row style={{paddingBottom: '20px'}}>
                <Col md={{span: 5}}>
                  <Form.Control 
                    type="text" 
                    placeholder="Prep Time" 
                    value={step.prep_time}
                    onChange={(event) => handleStepChange(event, index, 'prep_time')}/>
                </Col>
                <Col md={{span: 5, offset: 2}}>
                  <Form.Control 
                    type="text" 
                    placeholder="Cook Time" 
                    value={step.cooking_time}
                    onChange={(event) => handleStepChange(event, index, 'cooking_time')}/>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        </div>
      ))}
      <div className="d-flex justify-content-end">
        <Button style={{backgroundColor: 'orange'}} onClick={handleAddStep}>
          + Add Step
        </Button>
      </div>
    </div>
  );
};

export default Steps;
