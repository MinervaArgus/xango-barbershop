import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from '../Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // Maybe return loading?
      return;
    }
    if (user) {
      history.push("/Admin");
      window.location.reload(false);
    }
  }, [user, loading, history]);

  /* const logInWithEmailAndPassword = async (email, password) => {
    try {

    } catch (err) {

    }
  }; */

  return (

    <Container className='my-4 align-items-center'>

      <h3>Sign in</h3>

      <Container className="my-2">
        <Row className="justify-content-md-center">
          <Col md="auto" lg="auto">
            <Form className='my-1' noValidate>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email Address"
                  autoFocus
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label className='mt-2'>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Container className='d-grid gap-2 mt-4'>
                  <Button size="lg" onClick={() => logInWithEmailAndPassword(email, password)}>Sign In</Button>
                </Container>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}