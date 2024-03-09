import React from "react";
import Mingle_bg from "../Assets/Mingle_bg.png";
import Mingle_logo from "../Assets/Mingle_logo.jpg";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { FaArrowAltCircleUp } from "react-icons/fa";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";

const NavComponent = (props) => {
  const { user, setUser } = useContext(UserContext);
  const { home} = props;
  const navigate = useNavigate();
  const idx = window.localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/loggedInUser/${idx}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [idx,setUser]);
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
          <Navbar.Brand href="#" className="me-5">
            <img src={Mingle_logo} alt="Mingle" width="100" height="100" />
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <h1
              className="fst-italic fw-bold mx-auto"
              style={{ color: "#FFC371" }}
            >
              Pizza Mingle
            </h1>
            {home === false ? (
            <Nav
              className="me-4 "
              navbarScroll
            >
              <Nav.Link
                className="fw-bold fs-5 border border-light rounded text-light p-1 m-1"
                onClick={() => navigate("/homepage")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="fw-bold fs-5 border border-light rounded text-light p-1 m-1"
                onClick={() => navigate("/order")}
              >
                Order ({user.orderNum})
              </Nav.Link>
              <Nav.Link
                className="fw-bold fs-5 border border-light rounded text-light p-1 m-1"
                onClick={() => navigate("/account")}
              >
                Account
              </Nav.Link>
            </Nav>
            ) :
              null}
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
      <Navbar>
      <Navbar.Brand
            href="#"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "9999", // Adjust z-index to ensure it's above other elements
            }}
          >
            <FaArrowAltCircleUp size="45" />
          </Navbar.Brand>
          </Navbar>
    </div>
  );
};

export default NavComponent;
