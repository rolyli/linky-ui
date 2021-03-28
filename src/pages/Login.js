import { Form, Button } from "react-bootstrap";
import axios from "../axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/signup", { username, password });
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data));
        props.setUser(res.data)
        props.history.push("/");
      }
    } catch (error) {
      setUsername("");
      setPassword("");
      setMessage("Unable to sign-up.");
    }
  };

  return (
    <div className="app">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Form.Text>{message}</Form.Text>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", { username, password });
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        props.setUser(res.data);
        props.history.push("/");
      }
    } catch (error) {
      setUsername("");
      setPassword("");
      setMessage("Unable to login.");
    }
  };

  return (
    <div className="app login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Form.Text>
          Don't have an account? Sign up <Link to="/signup">here.</Link>
        </Form.Text>
        <Form.Text>{message}</Form.Text>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export { Login, Signup };
