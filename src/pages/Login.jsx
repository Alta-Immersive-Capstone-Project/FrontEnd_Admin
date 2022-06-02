import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import { URL } from '../components/URL';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState("success");

  const navigate = useNavigate();

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const changePasword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const clickSubmit = () => {
    const body = {
      email: email,
      password: password,
    };

    if (!email) {
      setMessage("Email tidak boleh kosong");
      setColor("danger");
      return;
    } else if (!password) {
      setMessage("Password tidak boleh kosong");
      setColor("danger");
      return;
    }

    console.log("testing");

    axios
      .post(`${URL}/login`, body)
      .then((data) => {
        localStorage.setItem("token", data.data.data);

        setMessage("Success Login!");
        setColor("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setMessage("Email and password not Match!");
        setColor("danger");
      });
  };

  return (
    <div className="container">
      <div className="login-body">
        <div className="login-border">
          <div className="login-wrap">
            <div className="login-title">
              {message && <Alert variant={color}>{message}</Alert>}
              <h2>Admin</h2>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={changeEmail}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password!"
                  onChange={changePasword}
                />
              </Form.Group>

              <div className="login-forgot">
                <p>Forgot Password?</p>
              </div>

              <Button className="login-button" size="l" onClick={clickSubmit}>
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
