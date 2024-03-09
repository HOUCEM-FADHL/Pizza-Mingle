// Importing necessary React components, styles, and dependencies
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavComponent from "../Components/NavComponent";

// Register component for user registration
const Register = () => {
  // State to manage user registration data, error messages, and navigation
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  // Array of Tunisian states for the state dropdown
  const tunisianStates = [
    "Tunis",
    "Ariana",
    "Ben Arous",
    "Manouba",
    "Nabeul",
    "Zaghouan",
    "Bizerte",
    "Béja",
    "Jendouba",
    "Kef",
    "Siliana",
    "Kairouan",
    "Kasserine",
    "Sidi Bouzid",
    "Sousse",
    "Mahdia",
    "Monastir",
    "Gabès",
    "Médenine",
    "Tataouine",
    "Gafsa",
    "Tozeur",
    "Kebili",
  ];

  // State to manage error messages during registration
  const [error, setError] = useState([]);
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function to handle form submission (user registration)
  const handleSubmit = (e) => {
    console.log("user", user);
    e.preventDefault();
    // Sending a registration request to the server
    axios
      .post("http://localhost:8000/api/registerUser", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("register-res", res.data);
        // Storing user ID in localStorage and navigating to homepage
        window.localStorage.setItem("userId", res.data._id);
        navigate("/homepage");
        setError([]);
      })
      .catch((err) => {
        console.log("registerErr:", err.response.data);
        // Handling different types of registration errors
        if (err.response.data.message) {
          setError(err.response.data);
        } else if (err.response.data.error.errors) {
          setError(err.response.data.error.errors);
        } else setError([]);
      });
  };

  // Rendering the Register component
  return (
    <div>
      {/* Navigation component for header */}
      <NavComponent home={true} />
      {/* Container for the registration form */}
      <div className="container w-50 mx-auto bg-light rounded p-3">
        <h1 className="text-center">Register</h1>
        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* Row for first name and last name */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                onChange={handleChange}
                value={user.firstName}
              />
              {error.firstName && (
                <p className="text-danger">{error.firstName.message}</p>
              )}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                onChange={handleChange}
                value={user.lastName}
              />
              {error.lastName && (
                <p className="text-danger">{error.lastName.message}</p>
              )}
            </Form.Group>
          </Row>
          {/* Email input */}
          <Form.Group className="mb-3">
            <Form.Label className="mb-3">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={user.email}
            />
            {error && <p className="text-danger">{error.message}</p>}
          </Form.Group>
          {/* Address input */}
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={handleChange}
              value={user.address}
            />
            {error.address && (
              <p className="text-danger">{error.address.message}</p>
            )}
          </Form.Group>
          {/* Row for city and state inputs */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                onChange={handleChange}
                value={user.city}
              />
              {error.city && (
                <p className="text-danger">{error.city.message}</p>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              {/* Dropdown for Tunisian states */}
              <Form.Select
                value={user.state}
                name="state"
                onChange={handleChange}
              >
                <option>Choose...</option>
                {tunisianStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
              {error.state && (
                <p className="text-danger">{error.state.message}</p>
              )}
            </Form.Group>
          </Row>
          {/* Password input */}
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
            />
            {error.password && (
              <p className="text-danger">{error.password.message}</p>
            )}
          </Form.Group>
          {/* Confirm Password input */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={user.confirmPassword}
            />
            {error.confirmPassword && (
              <p className="text-danger">{error.confirmPassword.message}</p>
            )}
          </Form.Group>
          {/* Submit button */}
          <Row className="mt-3 mx-auto w-25">
            <Button className="mb-3" variant="warning" type="submit">
              Register
            </Button>
          </Row>
        </form>
        {/* Link to login page */}
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
};

// Export the Register component as the default export
export default Register;
