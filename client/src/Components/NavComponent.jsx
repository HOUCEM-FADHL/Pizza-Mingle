import React from "react";
import Mingle_bg from "../Assets/Mingle_bg.png"
import Mingle_logo from "../Assets/Mingle_logo.jpg"
import {
  Navbar,
  Nav,
  // NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavComponent = (props) => {
  const {home} = props;
  const navigate = useNavigate();
  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/api/logoutUser",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        window.localStorage.removeItem("userId");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundImage: `url(${Mingle_bg})` }}
        className=" shadow mb-5 bg-body-tertiary p-3 pb-0 pt-0"
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            className="me-5"
          >
            <img src={Mingle_logo} alt="Mingle" width="100" height="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
              <h1 className="fst-italic fw-bold mx-auto" style={{color: "#FFC371"}}>Pizza Mingle</h1>
            <Nav
              className="me-4"
            //   style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="fw-bold fs-5 border border-light rounded text-light p-1" onClick={()=> navigate("/homepage")}>
                Home
              </Nav.Link>
              <Nav.Link  className="fw-bold fs-5 border border-light rounded text-light p-1" onClick={()=> navigate("/order")}>
                Order
              </Nav.Link>
              <Nav.Link className="fw-bold fs-5 border border-light rounded text-light p-1" onClick={()=> navigate("/account")}>
                Account
              </Nav.Link>
              
            </Nav>
            <Form className="d-flex">
              {home === true ? (
                <div className="d-flex">
                  <Button
                    variant="outline-light"
                    className="me-1"
                    onClick={() => navigate("/")}
                    >
                    Login
                  </Button>
                  <Button
                    variant="outline-light"
                    className="text-text-decoration-none"
                    onClick={() => navigate("/register")}
                    >
                    Register
                  </Button>
                </div>
              ) : (
                <Button
                variant="outline-light"
                className="me-1"
                onClick={logoutUser}
                >
                  Logout
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComponent;