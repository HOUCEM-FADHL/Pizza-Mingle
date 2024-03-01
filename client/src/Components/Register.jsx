import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/registerUser', user, {withCredentials: true})
        .then((res) => {
            console.log("register-res", res.data);
            window.localStorage.setItem('userId', res.data._id);
            navigate('/homepage');
        })
        .catch((err) => {
            console.log("registerErr:",err);
            setError(err.response.data);
        });
    };
    return (
        <div className="container w-50 mx-auto">
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={user.firstName}
                />
                {/* {error.firstName && <p className="text-danger">{error.firstName.message}</p>} */}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={user.lastName}
                />
                {/* {error.lastName && <p className="text-danger">{error.lastName.message}</p>} */}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="mb-3">Email:</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                />
                {/* {error.email && <p className="text-danger">{error.email.message}</p>} */}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                />
                {/* {error.password && <p className="text-danger">{error.password.message}</p>} */}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={user.confirmPassword}
                />
                {/* {error.confirmPassword && <p className="text-danger">{error.confirmPassword.message}</p>} */}
            </Form.Group>
            <Button className="mb-3" type="submit">Register</Button>
            {error.message && <p className="text-danger">{error.message}</p>}
        </form>
        <Link to="/login">Already have an account? Login</Link>
        </div>
    );
};

export default Register;
