import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let userEndpoint = 'https://floating-ocean-36499.herokuapp.com/users/';
    /* Send a request to the server for authentication */
    axios
      .post(userEndpoint, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(err => {
        console.error('user already exists: ', err);
      });
  };

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="birthday"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          placeholder="Enter Birthday"
        />
      </Form.Group>
      <Button
        variant="outline-dark"
        type="submit"
        onClick={e => handleSubmit(e)}
      >
        Submit
      </Button>
    </Form>
  );
}
