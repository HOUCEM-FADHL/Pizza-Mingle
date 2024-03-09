// Importing necessary React components, styles, and dependencies
import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavComponent from "../Components/NavComponent";
import axios from "axios";

// Login component for user authentication
const Login = () => {
  // State to manage user login details and errors
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // Function to handle input changes in the login form
  const handlerChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  // Function to handle form submission (login)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logging user login details for testing purposes
    console.log(userLogin);
    // Sending a login request to the server
    axios
      .post("http://localhost:8000/api/loginUser", userLogin, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("loginUser-res:", res.data);
        // Storing user ID in localStorage for authentication
        window.localStorage.setItem("userId", res.data._id);
        // Navigating to the homepage after successful login
        navigate("/homepage");
      })
      .catch((err) => {
        console.log("loginErr:", err);
        // Handling and storing login errors
        setError(err.response.data);
      });
  };

  // Rendering the Login component
  return (
    <div>
      {/* Navigation component for header */}
      <NavComponent home={true} />
      {/* Container for login form */}
      <div className="container w-50 mx-auto bg-light rounded p-3">
        <h1 className="text-center">Welcome Back</h1>
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <Form.Group className="mb-3">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handlerChange}
              value={userLogin.email}
            />
          </Form.Group>
          {/* Password input field */}
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlerChange}
              value={userLogin.password}
            />
          </Form.Group>
          {/* Login button */}
          <Row className="mt-3 mx-auto w-25">
            <Button className="mb-3" variant="warning" type="submit">
              Login
            </Button>
          </Row>
          {/* Displaying login error message, if any */}
          {error.message && <p className="text-danger">{error.message}</p>}
        </form>
        {/* Link to navigate to the registration page */}
        <Link to="/register"> Don't have an Account. Register here</Link>
      </div>
    </div>
  );
};

// Export the Login component as the default export
export default Login;
