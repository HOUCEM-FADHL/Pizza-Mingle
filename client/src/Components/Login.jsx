import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handlerChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userLogin);
        axios
        .post("http://localhost:8000/api/loginUser", userLogin, {
            withCredentials: true
        })
        .then((res) => {
            console.log("loginUser-res:",res.data);
            window.localStorage.setItem('userId', res.data._id);
            navigate("/homepage");
        })
        .catch((err) => {
            console.log("loginErr:",err);
            setError(err.response.data);
        });
    };

    return (
        <div className="container w-50 mx-auto">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
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
            <Button className="mb-3" variant="primary" type="submit">
            Login
            </Button>
            {error.message && <p className="text-danger">{error.message}</p>}
        </form>
            <Link to="/">
            {" "}
            Don't have an Account. Register here
            </Link>
        </div>
    );
};

export default Login;
