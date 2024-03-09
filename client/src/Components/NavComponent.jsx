// Importing React and required dependencies
import React, { useEffect, useContext } from "react";
import Mingle_bg from "../Assets/Mingle_bg.png";
import Mingle_logo from "../Assets/Mingle_logo.jpg";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { FaArrowAltCircleUp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

// Functional component for the navigation bar
const NavComponent = (props) => {
  // Destructuring values from props and context
  const { user, setUser } = useContext(UserContext);
  const { home } = props;

  // Initializing navigation hook
  const navigate = useNavigate();

  // Getting user ID from local storage
  const idx = window.localStorage.getItem("userId");

  // Effect to fetch logged-in user data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/loggedInUser/${idx}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [idx, setUser]);

  // Function to handle user logout
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

  // Rendering the navigation bar component
  return (
    <div>
      {/* Main navigation bar */}
      <Navbar
        expand="lg"
        style={{ backgroundImage: `url(${Mingle_bg})` }}
        className="shadow mb-5 bg-body-tertiary p-3 pb-0 pt-0"
      >
        <Container fluid>
          {/* Mingle logo */}
          <Navbar.Brand href="#" className="me-5">
            <img src={Mingle_logo} alt="Mingle" width="100" height="100" />
          </Navbar.Brand>
          {/* Toggle button for responsive design */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          {/* Navbar content */}
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            {/* Title */}
            <h1
              className="fst-italic fw-bold mx-auto"
              style={{ color: "#FFC371" }}
            >
              Pizza Mingle
            </h1>
            {/* Conditional rendering of navigation links based on 'home' prop */}
            {home === false ? (
              <Nav className="me-4 " navbarScroll>
                {/* Home link */}
                <Nav.Link
                  className="fw-bold fs-5 border border-light rounded text-light p-1 m-1"
                  onClick={() => navigate("/homepage")}
                >
                  Home
                </Nav.Link>
                {/* Order link with dynamic order number */}
                <Nav.Link
                  className="fw-bold fs-5 border border-light rounded text-light p-1 m-1"
                  onClick={() => navigate("/order")}
                >
                  Order ({user.orderNum})
                </Nav.Link>
                {/* Account link */}
                <Nav.Link
                  className="fw-bold fs-5 border border-light rounded text-light p-1 m-1"
                  onClick={() => navigate("/account")}
                >
                  Account
                </Nav.Link>
              </Nav>
            ) : null}
            {/* Conditional rendering of login/register or logout button */}
            <Form className="d-flex">
              {home === true ? (
                <div className="d-flex">
                  {/* Login button */}
                  <Button
                    variant="outline-light"
                    className="me-1"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </Button>
                  {/* Register button */}
                  <Button
                    variant="outline-light"
                    className="text-text-decoration-none"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </div>
              ) : (
                // Logout button
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
      {/* Button for scrolling to the top */}
      <Navbar>
        <Navbar.Brand
          href="#"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "9999",
          }}
        >
          <FaArrowAltCircleUp size="45" />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

// Export the NavComponent as the default export
export default NavComponent;
