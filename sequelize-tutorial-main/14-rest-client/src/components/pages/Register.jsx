import React from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Register() {
  return (
    <div
      className="border d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card className="col-md-4 bg-body-tertiary">
        <Card.Body>
          <Card.Title className="text-center mb-5">
            <h4>Register</h4>
          </Card.Title>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" name="name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control type="email" name="email" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPassword">
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control type="password" name="password" />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formConfirmPassword"
            >
              <Form.Label column sm="3">
                Confirm Password
              </Form.Label>
              <Col sm="9">
                <Form.Control type="password" name="confirmPassword" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSubmitButton">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="formSubmitButton">
              <Col sm={{ span: 12 }}>
                <FormLabel>
                  <a href="/login">Login</a>
                </FormLabel>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
